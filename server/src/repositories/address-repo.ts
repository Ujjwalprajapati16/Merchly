import type { address } from "../types/Address-types.ts";
import Address from "../models/address-model.ts";

export const createAddress = async (address : address) => {
    return await Address.create(address);
}

export const getAddress = async (userId : string) => {
    return await Address.find({user : userId});
}

export const getAddressById = async (id : string) => {
    return await Address.findById(id);
}

export const updateAddress = async (id : string, address : address) => {
    return await Address.findByIdAndUpdate(id, address);
}

export const deleteAddress = async (id : string) => {
    return await Address.findByIdAndDelete(id);
}