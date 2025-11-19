import app from "./app.js";
import config from "./config/config.js";
import { connectDB } from "./utils/connectDB.js";

app.listen(config.port, () => {
    connectDB();
    console.log(`Server running at http://localhost:${config.port}`);
});