import { Season } from "../models/Season";
import { apiDelete, create, getAll, getById, update } from "./baseApi";

export async function getAllSeasons(): Promise<Season[]> {
    return await getAll<Season>("/season");
}

export async function createSeason(season: Season): Promise<Season> {
    return await create<Season>("/season", season);
}

export async function deleteSeason(id: number): Promise<void> {
    return await apiDelete("/season", id);
}

export async function updateSeason(season: Season): Promise<void> {
    return await update<Season>("/season", season);
}

export async function getSeasonById(id: number): Promise<Season> {
    return await getById<Season>("/season", id);
}