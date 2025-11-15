import app from "./app";
import config from "./config/config";
import { connectDB } from "./utils/connectDB";

app.listen(config.port, () => {
    connectDB();
    console.log(`Server running at http://localhost:${config.port}`);
});