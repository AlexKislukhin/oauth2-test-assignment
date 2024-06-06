import { AuthRequiredHOC } from "@/components/AuthRequiredHOC/AuthRequiredHOC";

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthRequiredHOC>{children}</AuthRequiredHOC>;
}
