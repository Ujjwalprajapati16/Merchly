import dotenv from "dotenv";
dotenv.config();

const _config = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI as string,
    jwt_secret: process.env.JWT_SECRET as string,
    node_env: process.env.NODE_ENV as string,
    client_url: process.env.CLIENT_URL as string,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string
}

const config = {
    ..._config
}

export default config;