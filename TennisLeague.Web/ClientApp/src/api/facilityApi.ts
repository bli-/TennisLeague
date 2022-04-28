import { Facility } from "../components/facility/Facility";
import { getAll, create, apiDelete, update } from "./baseApi";

export async function getAllFacilities(): Promise<Facility[]> {
    return await getAll<Facility>("/facility");
}

export async function createFacility(facility: Facility): Promise<Facility> {
    return await create<Facility>("/facility", facility);
}

export async function deleteFacility(id: number): Promise<void> {
    return await apiDelete("/facility", id);
}

export async function updateFacility(facility: Facility): Promise<void> {
    return await update<Facility>("/facility", facility);
}