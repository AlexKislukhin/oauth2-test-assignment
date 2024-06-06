import { verifyAndExtractUserFromJWT } from "../utils/auth";

const MOCK_USER = { firstName: "Alex", lastName: "Doe" };
const MOCK_JWT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBbGV4IiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE3MTc2ODI0ODMsImV4cCI6MjAzMzI1ODQ4M30.NuYNarV8hBPeCg_-l1pN3cRUjB1EsPwB4qnkH2r7eZc";

const MOCK_EXPIRED_JWT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBbGV4IiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE3MTc2ODI2OTUsImV4cCI6MTcxNzY4MjY5Nn0.WoRcr4AlzIKZYX4zVc3roMtkSNpSdLNYevjw87pN4_0";

describe("Authentication utils", () => {
    it("should extract user from JWT", () => {
        const extractedUser = verifyAndExtractUserFromJWT(MOCK_JWT_TOKEN);

        expect(extractedUser).not.toBeNull();
        expect(extractedUser).toEqual(MOCK_USER);
    });

    it("should return null on expired token", () => {
        const extractedUser = verifyAndExtractUserFromJWT(
            MOCK_EXPIRED_JWT_TOKEN
        );

        expect(extractedUser).toBeNull();
    });
});
