import { addDaysToDate } from "../../utilities/dateTimeHelpers";

export class SeasonFormEntryFields {
    constructor() {
        this.seasonID = 1;
        this.year = new Date().getFullYear();
        this.startDate = new Date(new Date().toDateString()); // Date only; remove time
        this.registrationDate = addDaysToDate(this.startDate, -14);
        this.seasonLength = 9;
    }

    id: number;
    seasonID: number;
    year: number;
    startDate: Date;
    registrationDate: Date;
    seasonLength: number;
}