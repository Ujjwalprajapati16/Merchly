import bcrypt from 'bcrypt';
import type { RegisterUser, User } from '../types/User-types.ts';
import { createNewUser, getUserByEmail } from '../repositories/user-repo.ts';
import { APIError, NotFound, Unauthorized } from '../middlewares/ErrorHandler.ts';

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

export const loginUserService = async (email: string, password: string) => {
  const user : User | null = await getUserByEmail(email);

  if(!user) {
    throw new NotFound("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    throw new Unauthorized("Invalid credentials");
  }

  return user;
};