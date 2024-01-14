export interface Calendar {
    findByType(type: any): Promise<DavCalendarEvent[]>
}

export interface DavCalendarEvent {
    data: string
    url: string
}

export interface CalendarObject {
    calendarComponent: any;
    dav: any;
}