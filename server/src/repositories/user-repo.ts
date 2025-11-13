import addressModel from "../models/address-model.ts";
import userModel from "../models/user-model.ts";
import type { RegisterUser } from "../types/User-types.ts";

export const createNewUser = async (user: RegisterUser) => {
    return await userModel.create(user);
};

export const getUserByEmail = async (email: string) => {
    return await userModel.findOne({ email });
};

export const getUserById = async (id: string) => {
    return await userModel.findById(id);
};

export const getUserDetailWithAddresses = async (id: string) => {
  // Fetch user
  const user = await userModel.findById(id).select("-password");

  if (!user) return null;

  const addresses = await addressModel.find({ user: id });

  return {
    ...user.toObject(),
    addresses,
  };
};