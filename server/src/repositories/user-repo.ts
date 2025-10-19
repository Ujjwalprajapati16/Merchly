import userModel from "../models/user-model.ts";
import type { RegisterUser } from "../types/User-types.ts";

export const createNewUser = async (user: RegisterUser) => {
    return await userModel.create(user);
};

export const getUserByEmail = async (email: string) => {
    return await userModel.findOne({ email });
};