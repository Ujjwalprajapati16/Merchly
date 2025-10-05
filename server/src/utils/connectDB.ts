import { MongoClient } from "mongodb";
import config from "../config/config.ts";

let client: MongoClient | null = null;
let dbInstance: any = null;

export const connectDB = async () => {
  try {
    if (dbInstance) {
      console.log("✅ Already connected to MongoDB");
      return dbInstance;
    }

    const uri = config.mongo_uri;
    if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }

    client = new MongoClient(uri);
    await client.connect();

    dbInstance = client.db();
    console.log("✅ Connected to MongoDB");

    return dbInstance;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export { client };
