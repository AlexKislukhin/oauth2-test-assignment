"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountSearch() {
    const [search, setSearch] = useState("");

    const { push } = useRouter();

    return (
        <div>
            <div>Search</div>
            <input
                name="search"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
            />
            <div className="text-center">
                <button
                    type="button"
                    onClick={() => push(`/account/${search}`)}
                    className="py-2 px-4 bg-blue-200 rounded-xl mt-4"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
