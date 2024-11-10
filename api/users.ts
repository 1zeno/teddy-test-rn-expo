export interface IUser {
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
}

export const API_URL = "https://boasorte.teddybackoffice.com.br/users";

export const GET_USERS = (page: number, limit: number) => {
    return {
        url: `${API_URL}?page=${page}&limit=${limit}`,
        options: {
            method: "GET",
        },
    }
}

export const GET_USER_BY_ID = (id: number) => {
    return {
        url: `${API_URL}/${id}`,
        options: {
            method: "GET",
        },
    }
}

export const CREATE_USER = (body: Omit<IUser, "id">) => {
    return {
        url: API_URL,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    }
}

export const EDIT_USER = (id: number, body: Omit<IUser, "id">) => {
    return {
        url: `${API_URL}/${id}`,
        options: {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    }
}

export const DELETE_USER = (id: number) => {
    return {
        url: `${API_URL}/${id}`,
        options: {
            method: "DELETE",
        },
    }
}