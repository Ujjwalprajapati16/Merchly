export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  addressCount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};