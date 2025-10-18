import mongoose from "mongoose";
import config from "../config/config.ts";

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const uri = config.mongo_uri;

    if (!uri) {
      throw new Error("❌ MONGO_URI is not defined in config");
    }

    // Prevent reconnect attempts if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return mongoose;
    }

    // Connect with recommended options
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully");

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Retrying...");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    return mongoose;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
