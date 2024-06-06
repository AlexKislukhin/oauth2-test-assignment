import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api";

export const useMe = () => {
    return useQuery({ queryKey: ["me"], queryFn: () => fetchMe() });
};
