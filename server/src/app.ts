import express from "express";
import cors from "cors";
import config from "./config/config.ts";

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

export default app;
