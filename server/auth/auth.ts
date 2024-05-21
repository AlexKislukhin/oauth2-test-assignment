import { Request, Response } from "express";

import { verify, sign, JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/auth";

// Store in some place more secure
const secret = "0wir90aw9p8rhwapfawpuifhawiuohf";

export const createJWT = (user: IUser) => {
    return sign(user, secret);
};

export const verifyAndExtractUserFromJWT = (
    token: any,
    maxAge = "20m"
): IUser | null => {
    if (!token) {
        return null;
    }

    try {
        const { firstName, lastName } = verify(token, secret, {
            maxAge,
        }) as JwtPayload & IUser;

        return { firstName, lastName };
    } catch (err) {
        console.log(err);

        return null;
    }
};

export const userAuthMiddleware = ({
    authRequired,
}: {
    authRequired: boolean;
}) => {
    return (req: Request, res: Response, next: () => void) => {
        try {
            const jwt = req.headers["authorization"]?.split(" ")[1];

            const user = verifyAndExtractUserFromJWT(jwt);

            if (!user) {
                throw new Error("No user found");
            }

            req.user = user;
        } catch (err) {
            if (authRequired) {
                return res.status(401).send({
                    success: false,
                    errorMessage: "Not authorized",
                });
            }
        }

        next();
    };
};
