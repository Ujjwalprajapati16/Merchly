import type { NextFunction, Request, Response } from "express";
import { createUser } from "../services/auth-services.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";

export const registerUser = async (req : Request, res : Response, next : NextFunction) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // hasing password
        const hassedPassword = await bcrypt.hash(password, 10);

        // creating new user
        const createdUser = await createUser(name, email, hassedPassword, role);

        if(!createdUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const token = jwt.sign({ id: createdUser.id }, config.jwt_secret, { expiresIn: "7d" });

        res.status(201).json({ message: "User created successfully", token, user: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
        } });
    } catch (error) {
        next(error);
    }
};
