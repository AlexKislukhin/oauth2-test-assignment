import express from "express";
import dotenv from "dotenv";
import { userAuthMiddleware } from "./auth/auth";
import { authRouter } from "./auth/route";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", userAuthMiddleware({ authRequired: true }), (req, res) => {
    res.send(req.user!.firstName);
});

app.use(authRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
