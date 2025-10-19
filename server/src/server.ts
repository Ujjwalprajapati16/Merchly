import app from "./app.ts";
import config from "./config/config.ts";
import { connectDB } from "./utils/connectDB.ts";

app.listen(config.port, () => {
    connectDB();
    console.log(`Server running at http://localhost:${config.port}`);
});