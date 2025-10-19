import bcrypt from 'bcrypt';
import type { RegisterUser } from '../types/User-types.ts';
import { createNewUser } from '../repositories/user-repo.ts';
import { APIError } from '../middlewares/ErrorHandler.ts';

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'customer' | 'admin' = 'customer'
) => {
  const hashedPassowrd = await bcrypt.hash(password, 10);

  const registerUser: RegisterUser = {
    name,
    email,
    password: hashedPassowrd,
    role,
  };

  const user = await createNewUser(registerUser);

  if(!user) {
    throw new APIError(500, "User already exists");
  }

  return user;
};
