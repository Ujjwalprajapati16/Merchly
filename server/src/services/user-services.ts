import { changePasswordById, deleteUserById, getUserById, getUserDetailWithAddresses, getUsersForAdmin, updateUserInfo } from "../repositories/user-repo";
import bcrypt from 'bcrypt';

export const getProfileService = async (id: string) => {
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

export const updateProfileService = async (
    id: string,
    name?: string,
    email?: string
) => {
    const updateData: any = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) return;

    return await updateUserInfo(id, updateData);
};

export const deleteUserService = async (id: string) => {
    return await deleteUserById(id);
}