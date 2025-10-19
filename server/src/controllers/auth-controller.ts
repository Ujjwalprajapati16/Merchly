import type { NextFunction, Request, Response } from "express";
import { createUser } from "../services/auth-services.ts";
import { generateJwt } from "../middlewares/JwtHandler.ts";
import { BadRequest } from "../middlewares/ErrorHandler.ts";

export const registerUser = async (req : Request, res : Response, next : NextFunction) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password ) {
        throw new BadRequest("Missing required fields");
    }

    try {
        const user = await createUser(name, email, password, role);

        const token = generateJwt(user);

        return res.status(201).json({ message: "User created successfully",token, user : {
            id: user.id,
            name: user.name,
            email: user.email
        } });
    } catch (error) {
        next(error);
    }
};
