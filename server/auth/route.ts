import { CookieOptions, Request, Response, Router } from "express";
import { createJWT, verifyAndExtractUserFromJWT } from "./auth";
import { IUser } from "../types/auth";
import { userLoginSchema } from "../schemas/userSchemas";

export const authRouter = Router();

const MOCK_USER: IUser = { firstName: "Alex", lastName: "Kiss" };

const REFRESH_TOKEN_NAME = "rf_token";

const RF_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    // 7 days
    maxAge: 1000 * 60 * 24 * 7,
    sameSite: true,
    secure: false, // isProd,
    path: "/refresh_token",
};

const MOCK_USER_CREDENTIALS = { username: "Alex", password: "123123123" };

authRouter.post("/login", (req, res) => {
    const creds = userLoginSchema.parse(req.body);

    // mocking matching user
    if (
        creds.username !== MOCK_USER_CREDENTIALS.username ||
        creds.password !== MOCK_USER_CREDENTIALS.password
    ) {
        return res.send({ success: false, errorMessage: "Wrong credentials" });
    }

    const token = createJWT(MOCK_USER);

    res.cookie(REFRESH_TOKEN_NAME, token, RF_COOKIE_OPTIONS);

    return res.send({ success: true, token });
});

authRouter.post("/logout", (_req, res) => {
    res.clearCookie(REFRESH_TOKEN_NAME, RF_COOKIE_OPTIONS);

    return res.send({ success: true });
});

authRouter.post("/refresh_token", (req, res) => {
    const token = req.cookies[REFRESH_TOKEN_NAME];

    const user = verifyAndExtractUserFromJWT(token, "7d");

    if (!user) {
        return res.send({ success: false });
    }

    const newToken = createJWT(user);

    res.cookie(REFRESH_TOKEN_NAME, newToken, RF_COOKIE_OPTIONS);

    return res.send({
        success: true,
        token: newToken,
    });
});
