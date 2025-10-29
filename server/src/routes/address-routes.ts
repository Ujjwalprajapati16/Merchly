import express from "express";
import { addAddress, deleteAddress, getAddress, getAddressById, getPreferredAddress, updateAddress } from "../controllers/address-controller.ts";
import { authenticate } from "../middlewares/AuthMiddleware.ts";

const addressRouter = express.Router();

addressRouter.post("/add", authenticate, addAddress);
addressRouter.get("/preferred", authenticate, getPreferredAddress); 
addressRouter.get("/", authenticate, getAddress);
addressRouter.get("/:id", authenticate, getAddressById);
addressRouter.patch("/:id", authenticate, updateAddress);
addressRouter.delete("/:id", authenticate, deleteAddress);

export default addressRouter;