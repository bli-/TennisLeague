import { Facility } from "../components/facility/Facility";

export async function getAllFacilities(): Promise<Facility[]> {
    var response = await fetch(`/facility`);

    if (!response.ok) {
        throw new Error(response.statusText); 
    }

    return response.json() as Promise<Facility[]>;
}

export async function createFacility(facility): Promise<Facility> {
    var response = await fetch(`/facility/`, {
        method: 'post',
        body: JSON.stringify(facility),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json() as Promise<Facility>;
}

export async function deleteFacility(id): Promise<void> {
    var response = await fetch(`/facility/${id}`, { method: 'delete' });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export async function updateFacility(facility): Promise<void> {
    var response = await fetch(`/facility/`, {
        method: 'put',
        body: JSON.stringify(facility),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}