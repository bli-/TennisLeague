import { DayOfWeek } from "../../models/DaysOfWeekEnum";

export class SessionEntryFormFields {
    constructor() {
        this.dayOfWeek = DayOfWeek.Monday;
        this.matchHour = 8;
        this.matchAmpm = 'PM';
        this.gender = 'Men\'s';
        this.seasonID = 1;
        this.ratingID = 1;
        this.matchTypeID = 1;
        this.facilityIds = [];
    }

    dayOfWeek: DayOfWeek;
    matchHour: number;
    matchAmpm: string;
    gender: string;
    seasonID: number;
    ratingID: number;
    matchTypeID: number;
    facilityIds: number[];
}