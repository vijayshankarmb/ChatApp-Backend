import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PORT", "NODE_ENV", "MONGO_URI", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"] as const;

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
})

export const env = {
    PORT: Number(process.env.PORT),
    NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string
}

