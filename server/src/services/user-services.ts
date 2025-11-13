import userModel from "../models/user-model.ts";
import { changePasswordById, getUserById, getUserDetailWithAddresses, getUsersForAdmin } from "../repositories/user-repo.ts";
import bcrypt from 'bcrypt';

export const getProfileService = async (id : string) => {
    return await getUserDetailWithAddresses(id);
}

export const changePasswordService = async (id: string, currentPassword: string, newPassword: string) => {
    const user = await getUserById(id);

    if (!user) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) throw new Error("Invalid current password");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await changePasswordById(id, hashedPassword);
}

export const getUsersService = async () => {
    return await getUsersForAdmin();
}