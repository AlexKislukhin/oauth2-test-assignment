import { CookieOptions, Request, Response, Router } from "express";
import {
    authRequiredMiddleware,
    createJWT,
    verifyAndExtractUserFromJWT,
} from "../../utils/auth";
import { IUser } from "../../types/auth";
import { userLoginSchema } from "../../schemas/userSchemas";

export const authRouter = Router();

const MOCK_USER: IUser = { firstName: "Alex", lastName: "Doe" };

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

authRouter.post("/login", async (req, res) => {
    try {
        const creds = userLoginSchema.parse(req.body);

        // mocking matching user
        if (
            creds.username !== MOCK_USER_CREDENTIALS.username ||
            creds.password !== MOCK_USER_CREDENTIALS.password
        ) {
            return res.send({
                success: false,
                errorMessage: "Wrong credentials",
            });
        }
    } catch (err) {
        return res.send({ success: false, errorMessage: "Wrong credentials" });
    }

    const rfToken = createJWT(MOCK_USER, "7d");
    const accessToken = createJWT(MOCK_USER, "20m");

    res.cookie(REFRESH_TOKEN_NAME, rfToken, RF_COOKIE_OPTIONS);
    return res.send({ success: true, token: accessToken });
});

authRouter.post("/logout", (_req, res) => {
    res.clearCookie(REFRESH_TOKEN_NAME, RF_COOKIE_OPTIONS);

    return res.send({ success: true });
});

authRouter.post("/refresh_token", (req, res) => {
    const token = req.cookies[REFRESH_TOKEN_NAME];

    const user = verifyAndExtractUserFromJWT(token);

    if (!user) {
        return res.send({ success: false });
    }

    const rfToken = createJWT(user, "7d");
    const accessToken = createJWT(user, "20m");

    res.cookie(REFRESH_TOKEN_NAME, rfToken, RF_COOKIE_OPTIONS);

    return res.send({
        success: true,
        token: accessToken,
    });
});

authRouter.get("/me", authRequiredMiddleware, (req, res) => {
    return res.send({ success: true, user: req.user });
});
