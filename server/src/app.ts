import express from "express";
import cors from "cors";
import config from "./config/config.ts";
import authRouter from "./routes/auth-route.ts";
import { APIError, BadRequest, errorHandler, NotFound } from "./middlewares/ErrorHandler.ts";

const app = express();

app.use(
  cors({
    origin: config.client_url, 
    credentials: true,        
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/v1/auth", authRouter);

// Error handler
app.use(errorHandler);

export default app;
