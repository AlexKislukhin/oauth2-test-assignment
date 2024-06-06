"use client";

import { Login } from "@/components/Login/Login";
import { useMe } from "@/api/queries/useMe";

export default function Home() {
    const { data, isLoading } = useMe();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <Login />;
    }

    return <div>Hello, {data.firstName}</div>;
}
