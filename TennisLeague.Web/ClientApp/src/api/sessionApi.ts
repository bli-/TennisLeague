import { Session } from "../models/Session";
import { SessionAttributes } from "../models/SessionAttributes";
import { apiDelete, create, get, getAll, getById, update } from "./baseApi";

export async function getAllSessions(): Promise<Session[]> {
    return await getAll<Session>("/session");
}

export async function createSession(session: Session): Promise<Session> {
    return await create<Session>("/session", session);
}

export async function deleteSession(id: number): Promise<void> {
    return await apiDelete("/session", id);
}

export async function updateSession(session: Session): Promise<void> {
    return await update<Session>("/session", session);
}

export async function getSessionById(id: number): Promise<Session> {
    return await getById<Session>("/session", id);
}

export async function getSessionsBySeasonId(id: number): Promise<Session[]> {
    return await getById<Session[]>("/session/season", id);
}

export async function getSessionAttributes(): Promise<SessionAttributes> {
    return await get<SessionAttributes>("/session/attributes");
}