export class LeagueSeason {
    constructor() {
        this.seasonID = 1;
        this.year = new Date().getFullYear();
        this.startDate = new Date(new Date().toDateString());
        this.durationInWeeks = 9;
    }

    id?: number;
    seasonID: number;
    year: number;
    startDate: Date;
    durationInWeeks: number;
}