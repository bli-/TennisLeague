import { LeagueSeason } from "../models/LeagueSeason";
import { SeasonAttributes } from "../models/SeasonAttributes";
import { SeasonFilter } from "../models/SeasonFilter";
import { apiDelete, create, get, getAll, getById, update } from "./baseApi";

export async function getSeasons(filter: SeasonFilter = null): Promise<LeagueSeason[]> {
    let queryUrl = "/season?";

    if (filter?.statusId) {
        queryUrl += `statusId=${filter.statusId}`;
    }

    var response = await getAll<LeagueSeason>(queryUrl);
    return response.map(season => fixLeagueSeasonDates(season));
}

export async function createSeason(season: LeagueSeason): Promise<LeagueSeason> {
    let response = await create<LeagueSeason>("/season", season);
    return fixLeagueSeasonDates(response);
}

export async function deleteSeason(id: number): Promise<void> {
    return await apiDelete("/season", id);
}

export async function updateSeason(season: LeagueSeason): Promise<void> {
    return await update<LeagueSeason>("/season", season);
}

export async function getSeasonById(id: number): Promise<LeagueSeason> {
    let response = await getById<LeagueSeason>("/season", id);
    return fixLeagueSeasonDates(response);
}

export async function getSeasonAttributes(): Promise<SeasonAttributes> {
    return await get<SeasonAttributes>("/season/attributes");
}

function fixLeagueSeasonDates(season: LeagueSeason): LeagueSeason {
    season.startDate = new Date(season.startDate);
    return season;
}