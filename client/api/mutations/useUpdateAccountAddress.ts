import { DefaultError, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/layout";
import { updateAccountAddress } from "../search";

export const useUpdateAccountAddress = () => {
    return useMutation<
        any,
        DefaultError,
        Parameters<typeof updateAccountAddress>
    >({
        mutationFn: (variables) => updateAccountAddress(...variables),
        onSuccess: (_data, [id]) => {
            queryClient.refetchQueries({ queryKey: ["search", id] });
        },
    });
};
