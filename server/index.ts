import express from "express";
import dotenv from "dotenv";
import { authRequiredMiddleware, userAuthMiddleware } from "./utils/auth";
import { authRouter } from "./routes/auth";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { accountRouter } from "./routes/account";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "content-type, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

    next();
});

app.use(userAuthMiddleware);

app.get("/", authRequiredMiddleware, (req, res) => {
    res.send(req.user!.firstName);
});

app.use(authRouter);
app.use(accountRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
