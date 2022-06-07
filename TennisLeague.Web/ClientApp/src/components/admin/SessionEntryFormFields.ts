import { DayOfWeek } from "../../models/DaysOfWeekEnum";

export class SessionEntryFormFields {
    constructor(leagueSeasonID: number = null) {
        this.dayOfWeek = DayOfWeek.Monday;
        this.matchHour = 8;
        this.matchAmpm = 'PM';
        this.gender = 'Men\'s';
        this.ratingID = 1;
        this.leagueSeasonID = leagueSeasonID;
        this.matchTypeID = 1;
        this.facilityIds = [];
    }

    id: number;
    dayOfWeek: DayOfWeek;
    matchHour: number;
    matchAmpm: string;
    gender: string;
    leagueSeasonID: number;
    ratingID: number;
    matchTypeID: number;
    facilityIds: number[];
}