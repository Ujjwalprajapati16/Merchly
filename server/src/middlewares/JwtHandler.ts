import type { User } from "../types/User-types.js";
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

export const generateJwt = (user: User) => {
    return jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email }, config.jwt_secret, {
        expiresIn: '7d',
    });
};

