import { Session } from "../models/Session";
import { SessionAttributes } from "../models/SessionAttributes";
import { apiDelete, create, get, getAll, getById, update } from "./baseApi";

export async function getAllSessions(): Promise<Session[]> {
    let response = await getAll<Session>("/session");
    return response.map(session => fixSessionDates(session));
}

export async function createSession(session: Session): Promise<Session> {
    let response = await create<Session>("/session", session);
    return fixSessionDates(response);
}

export async function deleteSession(id: number): Promise<void> {
    return await apiDelete("/session", id);
}

export async function updateSession(session: Session): Promise<void> {
    return await update<Session>("/session", session);
}

export async function getSessionById(id: number): Promise<Session> {
    let response = await getById<Session>("/session", id);
    return fixSessionDates(response);
}

export async function getSessionsBySeasonId(id: number): Promise<Session[]> {
    let response = await getById<Session[]>("/session/season", id);
    return response.map(session => fixSessionDates(session));
}

export async function getSessionAttributes(): Promise<SessionAttributes> {
    return await get<SessionAttributes>("/session/attributes");
}

function fixSessionDates(season: Session): Session {
    season.matchStart = new Date(season.matchStart);
    return season;
}