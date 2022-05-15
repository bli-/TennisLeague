export class SeasonFormEntryFields {
    constructor() {
        this.seasonID = 1;
        this.year = new Date().getFullYear();
        this.startDate = new Date(new Date().toDateString()); // Date only; remove time
        this.seasonLength = 9;
    }

    seasonID: number;
    year: number;
    startDate: Date;
    seasonLength: number;
}