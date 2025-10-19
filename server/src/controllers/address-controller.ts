import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { BadRequest, Unauthorized } from "../middlewares/ErrorHandler.ts";
import { addAddressService, getAddressService, updateAddressService } from "../services/address-services.ts";
import type { UpdateAddressDTO } from "../types/Address-types.ts";

export const addAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { addressLine1, addressLine2, city, state, country, pincode } = req.body;
    const user = req.user;

    if (!addressLine1 || !city || !state || !country || !pincode) {
        throw new BadRequest("Missing required fields");
    }

    if (!user) {
        throw new Unauthorized("Don't have access!!");
    }

    try {
        const address = await addAddressService(user.id, addressLine1, addressLine2, city, state, country, pincode);

        return res.status(201).json({ message: "Address added successfully", address });
    } catch (error) {
        next(error);
    }
}

export const getAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        throw new Unauthorized("Don't have access!!");
    }

    try {
        const addresses = await getAddressService(user.id);

        return res.status(200).json({
            message: "Addresses fetched successfully",
            addresses
        });
    } catch (error) {
        next(error);
    }
};

export const updateAddress = async (req: AuthRequest, res: Response, next: NextFunction) => { 
    const { id } = req.params;
    const { addressLine1, addressLine2, city, state, country, pincode } = req.body;
    const user = req.user;

    if(!id){
        throw new BadRequest("Id required to update address");
    }

    if(!user){
        throw new Unauthorized("Don't have access!!");
    }

    const addressToUpdate : UpdateAddressDTO = {
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode
    }

    try {
        const updatedAddress = await updateAddressService(id, addressToUpdate);

        return res.status(200).json({ message: "Address updated successfully", updatedAddress });
    } catch (error) {
        next(error);
    }
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => { }

export const getAddressById = async (req: Request, res: Response, next: NextFunction) => { }