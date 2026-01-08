import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        message: "Server is healthy"
    })
})

app.use(errorMiddleware);

export default app;