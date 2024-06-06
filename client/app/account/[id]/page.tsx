"use client";

import { useUpdateAccountAddress } from "@/api/mutations/useUpdateAccountAddress";
import { useSearch } from "@/api/queries/useSearch";
import { Loader } from "@/components/Loader/Loader";
import { useEffect, useState } from "react";

export default function Account({ params }: { params: { id: string } }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const { data, isLoading } = useSearch(params.id);

    const [address, setAddress] = useState(data?.address);

    const { mutateAsync, isPending } = useUpdateAccountAddress();

    useEffect(() => {
        setAddress(data?.address);
    }, [data?.address, isEditMode]);

    const updateAddress = async () => {
        await mutateAsync([params.id, address || ""]);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!data) {
        return <div>No account found</div>;
    }

    return (
        <div className="w-full relative">
            {isPending && <Loader />}
            <button
                className="absolute top-0 right-0 p-2 bg-blue-200 text-sm rounded-lg"
                onClick={() => setIsEditMode(!isEditMode)}
            >
                {isEditMode ? "Exit edit mode" : "Enable edit mode"}
            </button>
            <div>Account id: {data.id}</div>
            <div>First name: {data.firstName}</div>
            <div>Last name: {data.lastName}</div>

            <div>
                Address:{" "}
                {isEditMode ? (
                    <input
                        value={address}
                        name="address"
                        onChange={({ target }) => setAddress(target.value)}
                    />
                ) : (
                    data.address
                )}
            </div>
            <div>Account created: {new Date(data.createdAt).toUTCString()}</div>
            <div>
                Is a paid user:{" "}
                <input type="checkbox" checked={data.isPaid} disabled />
            </div>
            {isEditMode && (
                <div className="w-full text-center">
                    <button
                        className="bg-green-200 text-sm rounded-lg py-2 px-8"
                        onClick={updateAddress}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}
