import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest";
import { BadRequest, Unauthorized } from "../middlewares/ErrorHandler";
import { addAddressService, deleteAddressService, getAddressByIdService, getAddressService, getPreferredAddressService, setPreferredAddressService, updateAddressService } from "../services/address-services";
import type { UpdateAddressDTO } from "../types/Address-types";

export const addAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { addressLine1, addressLine2, city, state, country, pincode, isPreferred } = req.body;
    const user = req.user;

    if (!addressLine1 || !city || !state || !country || !pincode) {
        throw new BadRequest("Missing required fields");
    }

    if (!user) {
        throw new Unauthorized("Don't have access!!");
    }

    try {
        const address = await addAddressService(user.id, addressLine1, addressLine2, city, state, country, pincode, isPreferred);

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
    const { addressLine1, addressLine2, city, state, country, pincode, isPreferred } = req.body;
    const user = req.user;

    if (!id) {
        throw new BadRequest("Id required to update address");
    }

    if (!user) {
        throw new Unauthorized("Don't have access!!");
    }

    const addressToUpdate: UpdateAddressDTO = {
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode,
        isPreferred
    }

    try {
        const updatedAddress = await updateAddressService(id, addressToUpdate);

        return res.status(200).json({ message: "Address updated successfully", updatedAddress });
    } catch (error) {
        next(error);
    }
}

export const deleteAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
        throw new BadRequest("Id required to delete address");
    }

    if (!user) {
        throw new Unauthorized("Don't have access!!");
    }

    try {
        const result = await deleteAddressService(id, user.id);
        return res.status(200).json({ message: "Address deleted successfully", result });
    } catch (error) {
        next(error);
    }
}

export const getAddressById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequest("Id required to fetch address");
    }

    const user = req.user;

    if (!user) {
        throw new Unauthorized("Don't have access!!");
    }

    try {
        const address = await getAddressByIdService(id);
        return res.status(200).json({ message: "Address fetched successfully", address });
    } catch (error) {
        next(error);
    }
}

export const getPreferredAddress = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            throw new Unauthorized("Don't have access!!");
        }

        const address = await getPreferredAddressService(userId);

        if (!address) {
            return res.status(404).json({ message: "No preferred address found" });
        }

        res.status(200).json({
            message: "Preferred address fetched successfully",
            address,
        });
    } catch (error) {
        next(error);
    }
};

export const setPreferredAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;

        if (!userId) {
            throw new Unauthorized("Don't have access!!");
        }

        if (!id) {
            throw new BadRequest("Address ID is required");
        }

        const address = await setPreferredAddressService(userId, id);

        res.status(200).json({
            message: "Preferred address set successfully",
            address,
        });
    } catch (error) {
        next(error);
    }
};