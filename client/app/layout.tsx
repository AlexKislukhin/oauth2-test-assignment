"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ErrorBoundary fallback={() => <div>Error popped</div>}>
                <QueryClientProvider client={queryClient}>
                    <body className={inter.className}>
                        <Navbar />
                        <main className="flex min-h-screen flex-col items-center justify-between p-24">
                            {children}
                        </main>
                    </body>
                </QueryClientProvider>
            </ErrorBoundary>
        </html>
    );
}
