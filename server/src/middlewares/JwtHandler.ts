import type { User } from "../types/User-types.ts";
import config from '../config/config.ts';
import jwt from 'jsonwebtoken';

export const generateJwt = (user: User) => {
    return jwt.sign({ id: user.id }, config.jwt_secret, {
        expiresIn: '7d',
    });
};

