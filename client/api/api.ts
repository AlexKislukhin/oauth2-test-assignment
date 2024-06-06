import { clearToken, client } from "./client";

const API_URL = "http://localhost:3001";

export const fetchMe = async () => {
    const result = await client.get("/me");

    return result.data.user || null;
};

export const logout = async () => {
    const result = await client.post("/logout");

    clearToken();

    return result.data;
};

export const login = async (creds: { username: string; password: string }) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(creds),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    const data = await response.json();

    return data;
};
