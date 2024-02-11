import {initializeClientForUserView, findAll, getSingleCalendar, findPrincipalByUrl} from './caldavService';
import {mapDavCollectionToCalendar} from '../mapper/calendar.mapper';
import {mapCDavObjectToCalendarObject} from '../mapper/calendarObject.mapper';
import {Journal} from "../types/journal.type";
import {CalendarObject} from "../types/cdav-library/calendar.type";
import { JournalCalendar } from '../types/journal-calendar.type';


export class CalendarService {
    constructor() {

    }

    async fetchCalendars(): Promise<JournalCalendar[]> {
        await initializeClientForUserView();
        const {calendars} = await findAll();
        // calendars[1].components -> only when VJOURNAL is in there
        const journalCalendars: JournalCalendar[] = calendars.map(c => ({name: c.displayname, id: c.url.split('/').reverse()[1], url: c.url }));

        return journalCalendars;
    }


    async fetchJournalEntriesFromCalendar(calendarId: string): Promise<Journal[]> {
        await initializeClientForUserView();
        const simpleCalendar = await getSingleCalendar(calendarId);
        const events = await simpleCalendar.findByType('VJOURNAL')
        const journalEntries: Journal[] = [];
        const calendar = mapDavCollectionToCalendar(simpleCalendar, null);
        for (const event of events) {
            try {
                const calendarObject: CalendarObject = mapCDavObjectToCalendarObject(event, calendar.id)
                const iterator = calendarObject.calendarComponent.getVObjectIterator()
                const firstVObject = iterator.next().value
                const content = firstVObject.getFirstProperty('Description').value

                const journal = {
                    id: firstVObject.id,
                    title: firstVObject.title,
                    content: content,
                    calendar: calendarObject,
                };
                journalEntries.push(journal);
            } catch (e) {
                console.error(`could not convert calendar object of calendar ${calendar.id}`, e, {
                    response: event,
                })
            }
        }
        return journalEntries;
    }

    async fetchJournalEntries(): Promise<Journal[]> {
        await initializeClientForUserView();
        const {calendars} = await findAll();
        const simpleCalendar = calendars[1]
        const events = await simpleCalendar.findByType('VJOURNAL')
        const journalEntries: Journal[] = [];
        const calendar = mapDavCollectionToCalendar(simpleCalendar, null);
        for (const event of events) {
            // const parserManager = getParserManager()
            // const parser = parserManager.getParserForFileType('text/calendar')
            try {
                const calendarObject: CalendarObject = mapCDavObjectToCalendarObject(event, calendar.id)
                const iterator = calendarObject.calendarComponent.getVObjectIterator()
                const firstVObject = iterator.next().value
                const content = firstVObject.getFirstProperty('Description').value

                const journal = {
                    id: firstVObject.id,
                    title: firstVObject.title,
                    content: content,
                    calendar: calendarObject,
                };
                journalEntries.push(journal);
            } catch (e) {
                console.error(`could not convert calendar object of calendar ${calendar.id}`, e, {
                    response: event,
                })
            }
        }
        return journalEntries;
    }

    async updateCalendarEntry(journal: Journal): Promise<void> {
        const iterator = journal.calendar.calendarComponent.getVObjectIterator()
        const firstVObject = iterator.next().value
        firstVObject.updatePropertyWithValue('description', journal.content)
        firstVObject.title = journal.title;
        journal.calendar.dav.data = journal.calendar.calendarComponent.toICS();
        await journal.calendar.dav.update();journal.calendar.calendarComponent.toICS()
    }
}

