import { APIError, NotFound, Unauthorized } from "../middlewares/ErrorHandler.js";
import { createAddress, deleteAddress, getAddressById, getAddresses, getPreferredAddressByUserId, unsetAllPreferredAddresses, updateAddress } from "../repositories/address-repo.js";
import { getUserById } from "../repositories/user-repo.js";
import type { address, UpdateAddressDTO } from "../types/Address-types.js";
import type { User } from "../types/User-types.js";

export const addAddressService = async (
    userId: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    isPreferred: boolean = false
) => {
    const user: User | null = await getUserById(userId);
    if (!user) throw new APIError(404, "User not found");

    // If this address is preferred, unset all others first
    if (isPreferred) {
        await unsetAllPreferredAddresses(userId);
    }

    const address: address = {
        user,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode,
        isPreferred,
    };

    const createdAddress = await createAddress(address);
    if (!createdAddress) throw new APIError(500, "Failed to create address");

    return createdAddress;
};

export const getAddressService = async (userId: string) => {
    return await getAddresses(userId);
}

export const updateAddressService = async (id: string, updateData: UpdateAddressDTO) => {
    const existingAddress = await getAddressById(id);

    if (!existingAddress) {
        throw new NotFound("Address not found");
    }

    // If setting this address as preferred, unset all others first
    if (updateData.isPreferred) {
        await unsetAllPreferredAddresses(existingAddress.user.toString());
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

export const getPreferredAddressService = async (userId: string) => {
    return await getPreferredAddressByUserId(userId);
};

export const setPreferredAddressService = async (userId: string, addressId: string) => {
    const address = await getAddressById(addressId);
    if (!address) {
        throw new NotFound("Address not found");
    }

    const addressUserId = address.user.toString();
    if (addressUserId !== userId) {
        throw new Unauthorized("You are not allowed to set this address as preferred address");
    }

    await unsetAllPreferredAddresses(userId);
    address.isPreferred = true;
    return await updateAddress(addressId, address);
};