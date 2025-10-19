import express from "express";
import { addAddress, deleteAddress, getAddress, getAddressById, updateAddress } from "../controllers/address-controller.ts";

const addressRouter = express.Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/", getAddress);
addressRouter.get("/:id", getAddressById);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);

export default addressRouter;