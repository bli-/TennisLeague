import { Session } from "../components/admin/Session";
import { apiDelete, create, getAll, getById, update } from "./baseApi";

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