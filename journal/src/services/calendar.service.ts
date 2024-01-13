import {initializeClientForUserView, findAll} from './caldavService';
import {getParserManager} from '@nextcloud/calendar-js'
import {mapDavCollectionToCalendar} from '../mapper/calendar.mapper';
import {mapCDavObjectToCalendarObject} from '../mapper/calendarObject.mapper';
import {Journal} from "../types/journal.type";


export class CalendarService {
    constructor() {

    }

    async fetchCalendars(): Promise<Journal[]> {
        await initializeClientForUserView();
        const {calendars} = await findAll();
        const simpleCalendar = calendars[1]
        const events = await simpleCalendar.findByType('VJOURNAL')
        const journalEntries: Journal[] = [];
        for (const event of events) {
            // const parserManager = getParserManager()
            // const parser = parserManager.getParserForFileType('text/calendar')
            const calendar = mapDavCollectionToCalendar(simpleCalendar, null);
            try {
                const calendarObject = mapCDavObjectToCalendarObject(event, calendar.id)
                const iterator = calendarObject.calendarComponent.getVObjectIterator()
                const firstVObject = iterator.next().value
                const content = firstVObject._properties.get('DESCRIPTION')[0].value
                journalEntries.push(Object.assign(firstVObject, {content}))
            } catch (e) {
                console.error(`could not convert calendar object of calendar ${calendar.id}`, e, {
                    response: event,
                })
            }
        }
        return journalEntries;
    }
}

1