export async function getAllFacilities() {
    return await fetch(`/facility`);
}

export async function createFacility(facility) {
    return await fetch(`/facility/`, {
        method: 'post',
        body: JSON.stringify(facility),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export async function deleteFacility(id) {
    return await fetch(`/facility/${id}`, { method: 'delete' });
}

export async function updateFacility(facility) {
    return await fetch(`/facility/`, {
        method: 'put',
        body: JSON.stringify(facility),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}