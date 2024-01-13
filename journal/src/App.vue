<template>
    <!--
    SPDX-FileCopyrightText: Rafael Muselmann <ch.subel@gmx.de>
    SPDX-License-Identifier: AGPL-3.0-or-later
    -->
	<div id="content" class="app-journal">
		<AppNavigation>
			<AppNavigationNew v-if="!loading"
				:text="t('journal', 'New journal entry')"
				:disabled="true"
				button-id="new-journal-button"
				button-class="icon-add"
				@click="newNote" />
			<ul>
				<AppNavigationItem v-for="journalEntry in calendarStore?.journalEntries"
					:key="journalEntry.id"
					:title="journalEntry.title ? journalEntry.title : t('journal', 'New journal entry')"
					:class="{active: currentJournalEntryId === journalEntry.id}"
					@click="openNote(journalEntry)">
					<template slot="actions">
						<ActionButton v-if="journalEntry.id === -1"
							:disabled="true"
							icon="icon-close" 
							@click="cancelNewNote(journalEntry)">
							{{
							t('journal', 'Cancel journal entry creation') }}
						</ActionButton>
						<ActionButton v-else
							:disabled="true"
							icon="icon-delete"
							@click="deleteNote(journalEntry)">
							{{
							 t('journal', 'Delete journal entry') }}
						</ActionButton>
					</template>
				</AppNavigationItem>
			</ul>
		</AppNavigation>
		<AppContent>
			<div v-if="currentNote">
				<input ref="title"
					v-model="currentNote.title"
					type="text"
					:disabled="updating">
				<textarea ref="content" v-model="currentNote.content" :disabled="updating" />
				<input type="button"
					class="primary"
					:value="t('journal', 'Save')"
					:disabled="true || updating || !savePossible"
					@click="saveNote">
			</div>
			<div v-else id="emptycontent">
				<div class="icon-file" />
				<h2>{{t('journal', 'Create a entry to get started!')}}
          {{ calendarStore?.calendars}}
          {{ calendarStore?.journalTitles}}
        </h2>
			</div>
		</AppContent>
	</div>
</template>

<script>
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import AppContent from '@nextcloud/vue/dist/Components/AppContent'
import AppNavigation from '@nextcloud/vue/dist/Components/AppNavigation'
import AppNavigationItem from '@nextcloud/vue/dist/Components/AppNavigationItem'
import AppNavigationNew from '@nextcloud/vue/dist/Components/AppNavigationNew'

import '@nextcloud/dialogs/styles/toast.scss'
import { generateUrl } from '@nextcloud/router'
import { showError, showSuccess } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'

import {useCalendarStore} from "./stores/calendar.store";

export default {
	name: 'App',
	components: {
		ActionButton,
		AppContent,
		AppNavigation,
		AppNavigationItem,
		AppNavigationNew,
	},
	data() {
		return {
			notes: [],
			currentJournalEntryId: null,
			updating: false,
			loading: true,
      calendarStore: null,
		}
	},
	computed: {
		/**
		 * Return the currently selected note object
		 * @returns {Object|null}
		 */
		currentNote() {
			if (this.currentJournalEntryId === null) {
				return null
			}
			return this.calendarStore.journalEntries.find((journalEntry) => journalEntry.id === this.currentJournalEntryId)
		},

		/**
		 * Returns true if a note is selected and its title is not empty
		 * @returns {Boolean}
		 */
		savePossible() {
			return this.currentNote && this.currentNote.title !== ''
		},
	},
	/**
	 * Fetch list of notes when the component is loaded
	 */
	async mounted() {
		try {
			// const response = await axios.get(generateUrl('/apps/journal/notes'))
			// this.notes = response.data
		} catch (e) {
			console.error(e)
			showError(t('notestutorial', 'Could not fetch notes'))
		}
    this.calendarStore = useCalendarStore();
    await this.calendarStore.fetchJournalEntries();
    console.log('entries', this.calendarStore.journalEntries);
		this.loading = false
	},

	methods: {
		/**
		 * Create a new note and focus the note content field automatically
		 * @param {Object} journalEntry Note object
		 */
		openNote(journalEntry) {
			if (this.updating) {
				return
			}
			this.currentJournalEntryId = journalEntry.id
			this.$nextTick(() => {
				this.$refs.content.focus()
			})
		},
		/**
		 * Action tiggered when clicking the save button
		 * create a new note or save
		 */
		saveNote() {
			if (this.currentJournalEntryId === -1) {
				this.createNote(this.currentNote)
			} else {
				this.updateNote(this.currentNote)
			}
		},
		/**
		 * Create a new note and focus the note content field automatically
		 * The note is not yet saved, therefore an id of -1 is used until it
		 * has been persisted in the backend
		 */
		newNote() {
			if (this.currentJournalEntryId !== -1) {
				this.currentJournalEntryId = -1
				this.notes.push({
					id: -1,
					title: '',
					content: '',
				})
				this.$nextTick(() => {
					this.$refs.title.focus()
				})
			}
		},
		/**
		 * Abort creating a new note
		 */
		cancelNewNote() {
			this.notes.splice(this.notes.findIndex((note) => note.id === -1), 1)
			this.currentJournalEntryId = null
		},
		/**
		 * Create a new note by sending the information to the server
		 * @param {Object} note Note object
		 */
		async createNote(note) {
			this.updating = true
			try {
				const response = await axios.post(generateUrl('/apps/journal/notes'), note)
				const index = this.notes.findIndex((match) => match.id === this.currentJournalEntryId)
				this.$set(this.notes, index, response.data)
				this.currentJournalEntryId = response.data.id
			} catch (e) {
				console.error(e)
				showError(t('notestutorial', 'Could not create the note'))
			}
			this.updating = false
		},
		/**
		 * Update an existing note on the server
		 * @param {Object} note Note object
		 */
		async updateNote(note) {
			this.updating = true
			try {
				await axios.put(generateUrl(`/apps/journal/notes/${note.id}`), note)
			} catch (e) {
				console.error(e)
				showError(t('notestutorial', 'Could not update the note'))
			}
			this.updating = false
		},
		/**
		 * Delete a note, remove it from the frontend and show a hint
		 * @param {Object} note Note object
		 */
		async deleteNote(note) {
			try {
				await axios.delete(generateUrl(`/apps/journal/notes/${note.id}`))
				this.notes.splice(this.notes.indexOf(note), 1)
				if (this.currentJournalEntryId === note.id) {
					this.currentJournalEntryId = null
				}
				showSuccess(t('journal', 'Note deleted'))
			} catch (e) {
				console.error(e)
				showError(t('journal', 'Could not delete the note'))
			}
		},
	},
}
</script>
<style scoped>
	#app-content > div {
		width: 100%;
		height: 100%;
		padding: 20px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
	.app-content {
		padding-left: 40px!important;
	}

	input[type='text'] {
		width: 100%;
	}

	textarea {
		flex-grow: 1;
		width: 100%;
	}
</style>
