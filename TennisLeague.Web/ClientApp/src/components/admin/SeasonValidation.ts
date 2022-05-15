import { LeagueSeason } from "../../models/LeagueSeason";
import { SeasonFormEntryFields } from "./SeasonEntryFormFields";

export default function validateSeason (season: SeasonFormEntryFields, existingSeasons: LeagueSeason[]): string[] {
    var errors = [];
    if (!season.startDate) {
        errors.push("Start Date required");
    }

    if (season.seasonLength < 1) {
        errors.push("Season length cannot be less than 1 week");
    }

    if (existingSeasons.find(existing => existing.seasonID === season.seasonID && existing.year === season.year)) {
        errors.push("A season was already created for this season of the year");
    }

    if (existingSeasons.find(existing => existing.startDate.getTime() === season.startDate.getTime())) {
        errors.push("A season was already created with this start date");
    }

    return errors;
}