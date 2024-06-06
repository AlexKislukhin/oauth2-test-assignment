import { DefaultError, useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { queryClient } from "@/app/layout";

export interface IUser {
    firstName: string;
    lastName: string;
    success: boolean;
}

export const useLogin = () => {
    return useMutation<IUser, DefaultError, Parameters<typeof login>[0]>({
        mutationFn: login,
        onSuccess: (response) => {
            if (response.success) {
                queryClient.resetQueries({ queryKey: ["me"] });
            }
        },
    });
};
