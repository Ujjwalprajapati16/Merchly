import express from "express";
import cors from "cors";
import config from "./config/config.js";
import authRouter from "./routes/auth-routes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import addressRouter from "./routes/address-routes.js";
import productRouter from "./routes/product-routes.js";
import cartRouter from "./routes/cart-routes.js";
import orderRouter from "./routes/order-routes.js";
import UserRouter from "./routes/user-routes.js";
import WishListRouter from "./routes/wishlist-routes.js";

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
app.use("/api/v1/wishlist", WishListRouter)

// Root route
app.use("/", (req, res) => {
  res.json({ message: "Server is running" });
});


// Error handler
app.use(errorHandler);

export default app;
