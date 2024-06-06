import { Router } from "express";

export const accountRouter = Router();

accountRouter.get("/account/:id", (req, res) => {
    const { id } = req.params;

    res.send({
        success: true,
        account: {
            id,
            firstName: "John",
            lastName: "Doe",
            address: "Wawel 5, 31-001 Kraków, Polska",
            createdAt: new Date("2024-01-01 12:12:12").getTime(),
            isPaid: true,
        },
    });
});

accountRouter.put("/account/:id", (req, res) => {
    console.log(req.body);

    res.send({ success: true });
});
