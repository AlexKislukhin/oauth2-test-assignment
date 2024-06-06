import { client } from "./client";

interface GetAccountResponse {
    success: true;
    account: {
        id: string;
        firstName: string;
        lastName: string;
        address: string;
        createdAt: number;
        isPaid: true;
    };
}

export const fetchAccount = async (id: string) => {
    const result = await client.get<GetAccountResponse>(`/account/${id}`);

    return result.data.account;
};

export const updateAccountAddress = async (id: string, address: string) => {
    const result = await client.put<GetAccountResponse>(`/account/${id}`, {
        address,
    });

    return result.data.account;
};
