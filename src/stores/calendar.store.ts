import {defineStore} from "pinia";
import {CalendarService} from "../services/calendar.service";

const calendarService = new CalendarService();

export const useCalendarStore = defineStore({
    id: 'calendar',
    state: () => ({
        calendars: null,
        journalEntries: null,
    }),
    getters: {
        journalTitles: (state) => state.journalEntries?.map((entry) => entry.title)
    },
    actions: {
        increment() {
            this.counter++;
        },
        fetchJournals() {

        },

        async fetchCalendars() {
            try {
                this.calendars =  await calendarService.fetchCalendars();
            } catch (error) {
                alert(error)
                console.log(error)
            }            
        },
        async fetchJournalsByCalendarId(id: string) {
            try {
                this.journalEntries = await calendarService.fetchJournalEntriesFromCalendar(id);
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async fetchJournalEntries() {
            try {
                this.journalEntries = await calendarService.fetchJournalEntries();
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async updateJournalEntry(journalEntry) {
            try {
                await calendarService.updateCalendarEntry(journalEntry);
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }
    }
})