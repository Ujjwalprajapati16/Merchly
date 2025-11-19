import express from "express";
import { addAddress, deleteAddress, getAddress, getAddressById, getPreferredAddress, updateAddress, setPreferredAddress } from "../controllers/address-controller.js";
import { authenticate } from "../middlewares/AuthMiddleware.js";

const addressRouter = express.Router();

addressRouter.post("/add", authenticate, addAddress);
addressRouter.get("/preferred", authenticate, getPreferredAddress); 
addressRouter.patch("/preferred/:id", authenticate, setPreferredAddress); 
addressRouter.get("/", authenticate, getAddress);
addressRouter.get("/:id", authenticate, getAddressById);
addressRouter.patch("/:id", authenticate, updateAddress);
addressRouter.delete("/:id", authenticate, deleteAddress);

export default addressRouter;