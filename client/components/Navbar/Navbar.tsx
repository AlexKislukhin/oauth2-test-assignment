import { useLogout } from "@/api/mutations/useLogout";
import { useMe } from "@/api/queries/useMe";
import Link from "next/link";

export const Navbar = () => {
    const { data } = useMe();

    const { mutateAsync, isPending } = useLogout();

    if (!data) {
        return null;
    }

    return (
        <header className="flex flex-row justify-between w-full p-4">
            <div className="flex flex-row gap-4">
                <div>
                    <Link href="/">Home</Link>
                </div>
                <div>
                    <Link href="/account">Account</Link>
                </div>
                <div>
                    <Link href="/activation">Activation</Link>
                </div>
            </div>
            <div>
                <div
                    className="cursor-pointer text-red-600 font-bold"
                    onClick={() => !isPending && mutateAsync()}
                >
                    {isPending ? "Loading" : "Logout"}
                </div>
            </div>
        </header>
    );
};
