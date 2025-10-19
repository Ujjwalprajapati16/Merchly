import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { BadRequest, Unauthorized } from "../middlewares/ErrorHandler.ts";
import { addAddressService } from "../services/address-services.ts";

export const addAddress = async (req : AuthRequest, res : Response, next : NextFunction) => {
    const { addressLine1, addressLine2, city, state, country, pincode } = req.body;
    const user = req.user;

    if(!addressLine1 || !city || !state || !country || !pincode) {
        throw new BadRequest("Missing required fields");
    }

    if(!user) {
        throw new Unauthorized("Don't have access!!");
    }

    try {
        const address = await addAddressService(user.id, addressLine1, addressLine2, city, state, country, pincode);

        return res.status(201).json({ message: "Address added successfully", address });
    } catch (error) {
        next(error);
    }
}

export const getAddress = async (req : Request, res : Response, next : NextFunction) => {}

export const updateAddress = async (req : Request, res : Response, next : NextFunction) => {}

export const deleteAddress = async (req : Request, res : Response, next : NextFunction) => {}

export const getAddressById = async (req : Request, res : Response, next : NextFunction) => {}