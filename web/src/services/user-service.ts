import api from "@/lib/axios";

export const getUserProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data.profile;
};

export const updateUserProfile = async (payload: { name?: string; email?: string }) => {
  const res = await api.patch("/user/update", payload);
  return res.data.profile;
};

export const changePassword = async (payload: { currentPassword: string; newPassword: string }) => {
  const res = await api.patch("/user/change-password", payload);
  return res.data.message;
};

export const getAllUsers = async () => {
  const res = await api.get("/user");
  return res.data.users;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/user/${id}`);
  return res.data.message;
};
