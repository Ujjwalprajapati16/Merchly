import express from "express";
import { addAddress, deleteAddress, getAddress, getAddressById, updateAddress } from "../controllers/address-controller.ts";
import { authenticate } from "../middlewares/AuthMiddleware.ts";

const addressRouter = express.Router();

addressRouter.post("/add", authenticate, addAddress);
addressRouter.get("/", authenticate, getAddress);
addressRouter.get("/:id", authenticate, getAddressById);
addressRouter.put("/:id", authenticate, updateAddress);
addressRouter.delete("/:id", authenticate, deleteAddress);

export default addressRouter;