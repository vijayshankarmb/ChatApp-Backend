import { startServer } from "./server";
import { env, connectDB } from "./config";

const main = async (): Promise<void> => {
    await connectDB();
    startServer(env.PORT);
}

main();
