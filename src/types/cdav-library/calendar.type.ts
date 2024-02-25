export interface Calendar {
    components: string[];
    findByType(type: any): Promise<DavCalendarEvent[]>;
    get displayname(): string;
    get url(): string
}

export interface DavCalendarEvent {
    data: string
    url: string
}

export interface CalendarObject {
    calendarComponent: any;
    dav: any;
}