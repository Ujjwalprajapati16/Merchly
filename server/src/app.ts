import express from "express";
import cors from "cors";
import config from "./config/config.ts";
import authRouter from "./routes/auth-routes.ts";
import { errorHandler } from "./middlewares/ErrorHandler.ts";
import addressRouter from "./routes/address-routes.ts";
import productRouter from "./routes/product-routes.ts";
import cartRouter from "./routes/cart-routes.ts";
import orderRouter from "./routes/order-routes.ts";
import UserRouter from "./routes/user-routes.ts";

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

// Routing
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/user", UserRouter);

// Root route
app.use("/", (req, res) => {
  res.json({ message: "Server is running" });
});


// Error handler
app.use(errorHandler);

export default app;
