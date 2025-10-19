import { APIError, NotFound, Unauthorized } from "../middlewares/ErrorHandler.ts";
import { createAddress, deleteAddress, getAddressById, getAddresses, updateAddress } from "../repositories/address-repo.ts";
import { getUserById } from "../repositories/user-repo.ts";
import type { address, UpdateAddressDTO } from "../types/Address-types.ts";
import type { User } from "../types/User-types.ts";

export const addAddressService = async (userId: string, addressLine1: string, addressLine2: string, city: string, state: string, country: string, pincode: string) => {

    const user: User | null = await getUserById(userId);

    if (!user) {
        throw new APIError(404, "User not found");
    }

    const address: address = {
        user,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode
    }

    const createdAddress = await createAddress(address);

    if (!createdAddress) {
        throw new APIError(500, "Address already exists");
    }

    return createdAddress;
}

export const getAddressService = async (userId: string) => {
    return await getAddresses(userId);
}

export const updateAddressService = async (id: string, updateData: UpdateAddressDTO) => {
    const existingAddress = await getAddressById(id);

    if (!existingAddress) {
        throw new NotFound("Address not found");
    }

    Object.assign(existingAddress, updateData);

    const updatedAddress = await updateAddress(id, existingAddress);

    return updatedAddress;
};

export const deleteAddressService = async (id: string, userId: string) => {
    const address = await getAddressById(id);

    if (!address) {
        throw new NotFound("Address not found");
    }

    const addressUserId = address.user.toString(); 
    if (addressUserId !== userId) {
        throw new Unauthorized("You are not allowed to delete this address");
    }

    return await deleteAddress(id);
}

export const getAddressByIdService = async (id: string) => {
    return await getAddressById(id);
}