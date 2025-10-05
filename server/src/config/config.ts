import dotenv from "dotenv";
dotenv.config();

const _config = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI as string,
    jwt_secret: process.env.JWT_SECRET,
    environment: process.env.ENVIRONMENT,
    client_url: process.env.CLIENT_URL
}

const config = {
    ..._config
}

export default config;