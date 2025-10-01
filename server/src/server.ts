import app from "./app.ts";
import config from "./config/config.ts";

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:3000`);
});