import addressModel from "../models/address-model.ts";
import userModel from "../models/user-model.ts";
import type { RegisterUser } from "../types/User-types.ts";

export const createNewUser = async (user: RegisterUser) => {
  return await userModel.create(user);
};

export const getUserByEmail = async (email: string) => {
  return await userModel.findOne({ email });
};

export const getUserById = async (id: string) => {
  return await userModel.findById(id);
};

export const getUserDetailWithAddresses = async (id: string) => {
  // Fetch user
  const user = await userModel.findById(id).select("-password");

  if (!user) return null;

  const addresses = await addressModel.find({ user: id });

  return {
    ...user.toObject(),
    addresses,
  };
};

export const changePasswordById = async (id: string, password: string) => {
  return await userModel.updateOne({ _id: id }, { $set: { password } });
};

export const getUsersForAdmin = async () => {
  return await userModel.aggregate([
    { $match: { role: "customer" } },

    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "user",
        as: "addresses",
      },
    },

    {
      $addFields: {
        addressCount: { $size: "$addresses" },
        preferredAddress: {
          $first: {
            $map: {
              input: {
                $filter: {
                  input: "$addresses",
                  as: "addr",
                  cond: { $eq: ["$$addr.isPreferred", true] },
                },
              },
              as: "p",
              in: {
                addressLine1: "$$p.addressLine1",
                addressLine2: "$$p.addressLine2",
                city: "$$p.city",
                state: "$$p.state",
                country: "$$p.country",
                pincode: "$$p.pincode",
              },
            },
          },
        },
      },
    },

    {
      $project: {
        password: 0,
        addresses: 0,
      },
    },
  ]);
};

export const deleteUserById = async (id: string) => {
  return await userModel.deleteOne({ _id: id });
};

export const updateUserInfo = async (id: string, data: any) => {
  return await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
};
