import { addDaysToDate } from "../utilities/dateTimeHelpers";

export class LeagueSeason {
    constructor() {
        this.seasonID = 1;
        this.year = new Date().getFullYear();
        this.startDate = new Date(new Date().toDateString());
        this.durationInWeeks = 9;
        this.statusID = 1;
        this.registrationDate = addDaysToDate(this.startDate, -14);
    }

    id?: number;
    seasonID: number;
    year: number;
    startDate: Date;
    durationInWeeks: number;
    statusID: number;
    registrationDate: Date;
}