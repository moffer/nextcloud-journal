import {Calendar} from "./calendar.type";

export interface CalendarHome {
    findAllCalDAVCollections(): Promise<CalDavCollection>;
    findAllCalDAVCollectionsGrouped(): Promise<CalDavCollection>;
    findAllSubscriptions(): any;
    findAllDeletedCalendars(): any;
    findAllScheduleInboxes(): any;
    findAllScheduleOutboxes(): any;
    createCalendarCollection: any;
    createSubscribedCollection: any;
    enableBirthdayCalendar(): any;
    find(calendarName: string): any;
}

export interface CalDavCollection {
    calendars: Calendar[];
    deletedCalendars: any;
    trashBins: any;
    subscriptions: any;
    scheduleInboxes: any;
    scheduleOutboxes: any;

}