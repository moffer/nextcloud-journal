import {CalendarObject} from "./cdav-library/calendar.type";

export interface Journal {
    id: string;
    title: string;
    content: string;

    calendar: CalendarObject;
}
