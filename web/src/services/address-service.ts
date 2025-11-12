import api from "@/lib/axios";
import { addressPayload } from "@/types/addressTypes";

// Add a new address
export const addAddress = async (payload: addressPayload) => {
  const res = await api.post("/address/add", payload);
  return res.data.address;
};

// Get all addresses for current user
export const getAddresses = async () => {
  const res = await api.get("/address");
  return res.data.addresses;
};

// Get address by ID
export const getAddressById = async (id: string) => {
  const res = await api.get(`/address/${id}`);
  return res.data.address;
};

// Get preferred address
export const getPreferredAddress = async () => {
  const res = await api.get("/address/preferred");
  return res.data.address;
};

// Update an existing address
export const updateAddress = async (
  id: string,
  payload: Partial<addressPayload>
) => {
  const res = await api.patch(`/address/${id}`, payload);
  return res.data.updatedAddress;
};

// Delete an address
export const deleteAddress = async (id: string) => {
  const res = await api.delete(`/address/${id}`);
  return res.data.result;
};

// Set preferred address
export const setPreferredAddress = async (id: string) => {
  const res = await api.patch(`/address/preferred/${id}`);
  return res.data.address;
};
