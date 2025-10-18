import userModel from "../models/user-model.ts";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'customer' | 'admin' = 'customer'
) => {
  try {
    const createdUser = await userModel.create({ name, email, password, role });
    return createdUser;
  } catch (error) {
    return null;
  }
};
