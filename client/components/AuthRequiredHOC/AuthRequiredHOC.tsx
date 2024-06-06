"use client";

import { PropsWithChildren } from "react";
import { Loader } from "../Loader/Loader";
import { Login } from "../Login/Login";
import { useMe } from "@/api/queries/useMe";

export const AuthRequiredHOC = ({ children }: PropsWithChildren) => {
    const { data, isFetching } = useMe();

    if (isFetching) {
        return <Loader />;
    }

    if (!data) {
        return <Login />;
    }

    return <>{children}</>;
};
