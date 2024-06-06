import { useMutation } from "@tanstack/react-query";
import { logout } from "../api";
import { queryClient } from "@/app/layout";

export const useLogout = () => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ["me"] });
        },
    });
};
