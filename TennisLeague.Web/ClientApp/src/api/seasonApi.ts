import { LeagueSeason } from "../models/LeagueSeason";
import { Season } from "../models/Season";
import { apiDelete, create, getAll, getById, update } from "./baseApi";

export async function getAllSeasons(): Promise<LeagueSeason[]> {
    var response = await getAll<LeagueSeason>("/season");
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

export async function getSeasonsOfTheYear(): Promise<Season[]> {
    return await getAll<Season>("/seasonsOfYear");
}

function fixLeagueSeasonDates(season: LeagueSeason): LeagueSeason {
    season.startDate = new Date(season.startDate);
    return season;
}