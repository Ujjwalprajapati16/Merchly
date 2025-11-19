import type { address } from "../types/Address-types.js";
import Address from "../models/address-model.js";

export const createAddress = async (address: address) => {
    return await Address.create(address);
}

export const getAddresses = async (userId: string) => {
    return await Address.find({ user: userId }).lean();
}

export const getAddressById = async (id: string) => {
    return await Address.findById(id);
}

export const updateAddress = async (id: string, address: address) => {
    return await Address.findByIdAndUpdate(id, address, {
        new: true
    });
}

export const deleteAddress = async (id: string) => {
    return await Address.findByIdAndDelete(id);
}

export const getPreferredAddressByUserId = async (userId: string) => {
    return await Address.findOne({ user: userId, isPreferred: true });
};

export const unsetAllPreferredAddresses = async (userId: string) => {
    await Address.updateMany({ user: userId }, { $set: { isPreferred: false } });
};
