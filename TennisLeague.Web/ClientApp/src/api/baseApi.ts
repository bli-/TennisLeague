export async function getAll<Type>(url: string): Promise<Type[]> {
    var response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText); 
    }

    return response.json() as Promise<Type[]>;
}

export async function create<Type>(url: string, arg: Type): Promise<Type> {
    var response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(arg),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json() as Promise<Type>;
}

export async function post(url: string) {
    var response = await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export async function apiDelete(url:string, id: number): Promise<void> {
    if (url.endsWith("/")) {
        url = url.substring(0, url.length - 1);
    }
    
    var response = await fetch(`${url}/${id}`, { method: 'delete' });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export async function update<Type>(url: string, arg: Type): Promise<void> {
    var response = await fetch(url, {
        method: 'put',
        body: JSON.stringify(arg),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export async function getById<Type>(url: string, id: number): Promise<Type> {
    if (url.endsWith("/")) {
        url = url.substring(0, url.length - 1);
    }

    var response = await fetch(`${url}/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText); 
    }

    return response.json() as Promise<Type>;
}

export async function get<Type>(url: string): Promise<Type> {
    var response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText); 
    }

    return response.json() as Promise<Type>;
}