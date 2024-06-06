import { queryClient } from "@/app/layout";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3001";

export const client = axios.create({ baseURL: API_URL, withCredentials: true });

type IRefreshTokenResponse =
    | { success: true; token: string }
    | { success: false; errorMessage: string };

const createClosure = () => {
    let storedToken: string | null;

    const getToken = async () => {
        if (!isJWTExpired(storedToken)) {
            return `Bearer ${storedToken}`;
        }

        const response = await axios.post<IRefreshTokenResponse>(
            `${API_URL}/refresh_token`,
            null,
            { withCredentials: true }
        );

        if (response.data.success) {
            storedToken = response.data.token;
            return `Bearer ${storedToken}`;
        }

        // If user was logged in current session but we couldn't get new token
        if (storedToken) {
            queryClient.resetQueries({ queryKey: ["me"] });
            storedToken = null;
        }
    };

    const clearToken = () => {
        storedToken = null;
    };

    return { clearToken, getToken };
};

export const { clearToken, getToken } = createClosure();

const isJWTExpired = (token: any): boolean => {
    try {
        if (!token) {
            return true;
        }

        const decodedToken = jwtDecode(token);

        if (decodedToken.exp! < Date.now() / 1000) {
            return true;
        }

        return false;
    } catch (err) {
        return true;
    }
};

client.interceptors.request.use(
    async (config) => {
        config.headers["Authorization"] = await getToken();

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

client.interceptors.response.use((response) => {
    if (!response.data.success) {
        const errorMessage =
            response.data.errorMessage ||
            "Something went wrong with your request";

        alert(errorMessage);

        throw new Error(errorMessage);
    }

    return response;
});
