import api from "@/lib/axios";

export const buyNow = async (data: any) => {
  const res = await api.post("/api/order/buy-now", data);
  return res.data;
};

export const cancelOrder = async (orderId: string) => {
  const res = await api.patch(`/api/order/${orderId}/cancel`);
  return res.data;
};

export const updatePaymentStatus = async (orderId: string, paymentData: any) => {
  const res = await api.patch(`/api/order/${orderId}/payment`, paymentData);
  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const res = await api.get(`/api/order/${orderId}`);
  return res.data;
};

export const getUserOrders = async ({ page = 1, limit = 5 }) => {
  const res = await api.get(`/order?page=${page}&limit=${limit}`);
  console.log(res.data);
  return res.data;
};
