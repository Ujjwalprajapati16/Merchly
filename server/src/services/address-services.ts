import { APIError } from "../middlewares/ErrorHandler.ts";
import { createAddress, getAddresses } from "../repositories/address-repo.ts";
import { getUserById } from "../repositories/user-repo.ts";
import type { address } from "../types/Address-types.ts";
import type { User } from "../types/User-types.ts";

export const addAddressService = async (userId : string, addressLine1 : string, addressLine2 : string, city : string, state : string, country : string, pincode : string) => {

    const user : User | null = await getUserById(userId);

    if(!user) {
        throw new APIError(404, "User not found");
    }

    const address : address = {
        user,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode
    }

    const createdAddress = await createAddress(address);

    if(!createdAddress) {
        throw new APIError(500, "Address already exists");
    }

    return createdAddress;
}

export const getAddressService= async (userId : string) => {
    return await getAddresses(userId);
}