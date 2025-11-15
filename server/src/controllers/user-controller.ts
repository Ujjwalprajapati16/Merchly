import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest";
import { Unauthorized } from "../middlewares/ErrorHandler";
import { changePasswordService, deleteUserService, getProfileService, getUsersService, updateProfileService } from "../services/user-services";

export const userProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    if (!id) {
        throw new Unauthorized("Unauthorized: Please login first.");
    }

    try {
        const profile = await getProfileService(id);
        res.status(200).json({ message: "User profile fetched successfully", profile});
    } catch (error) {
        next(error);
    }
}

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const {currentPassword, newPassword} = req.body;
    const id = req.user?.id;

    if (!id) {
        throw new Unauthorized("Unauthorized: Please login first.");
    }

    try {
        await changePasswordService(id, currentPassword, newPassword);
        res.status(200).json({ message: "Password changed successfully!"});
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const users = await getUsersService();
        res.status(200).json({ message: "Users fetched successfully", users});
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    if (!id) {
        throw new Unauthorized("Unauthorized: Please login first.");
    }

    const {name, email} = req.body;

    try {
        const updatedProfile = await updateProfileService(id, name, email);
        if(!updatedProfile) {
            throw new Error("Failed to update profile");
        }
        res.status(200).json({ message: "Profile updated successfully!", profile: updatedProfile});
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const {id} = req.params;
    if (!id) {
        throw new Unauthorized("Unauthorized: Please login first.");
    }

    try {
        await deleteUserService(id);
        res.status(200).json({ message: "User deleted successfully!"});
    } catch(error){
        next(error);
    }
}