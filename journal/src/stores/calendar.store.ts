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
        async fetchJournalEntries() {
            try {
                this.journalEntries = await calendarService.fetchCalendars();
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }
    }
})