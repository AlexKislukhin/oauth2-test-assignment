import { useQuery } from "@tanstack/react-query";
import { fetchAccount } from "../search";

export const useSearch = (id: string) => {
    return useQuery({
        queryKey: ["search", id],
        queryFn: () => fetchAccount(id),
        enabled: true,
    });
};
