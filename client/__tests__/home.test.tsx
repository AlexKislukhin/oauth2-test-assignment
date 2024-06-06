import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import nock from "nock";

const TestWrapper = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider
            client={
                new QueryClient({
                    defaultOptions: { queries: { retry: false } },
                })
            }
        >
            {children}
        </QueryClientProvider>
    );
};

describe("Home page", () => {
    afterEach(() => {
        nock.restore();
    });

    it("renders login when there's no user", async () => {
        nock("http://localhost:3001").post("/refresh_token").reply(401, {
            success: false,
        });

        nock("http://localhost:3001").get("/me").reply(401, {
            success: false,
        });

        render(
            <TestWrapper>
                <Home />
            </TestWrapper>
        );

        const loader = screen.getByText("Loading...");

        expect(loader).toBeInTheDocument();

        await waitFor(() =>
            expect(screen.getByText("Username")).toBeInTheDocument()
        );

        await waitFor(() =>
            expect(screen.getByText("Password")).toBeInTheDocument()
        );
    });
});
