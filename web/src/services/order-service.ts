import api from "@/lib/axios";

export const buyNow = async (data: any) => {
  const res = await api.post("/order/buy-now", data);
  return res.data;
};

export const cancelOrder = async (orderId: string) => {
  const res = await api.patch(`/order/${orderId}/cancel`);
  return res.data;
};

export const updatePaymentStatus = async (orderId: string, paymentData: any) => {
  const res = await api.patch(`/order/${orderId}/payment`, paymentData);
  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const res = await api.get(`/order/${orderId}`);
  console.log(res);
  return res.data;
};

export const getUserOrders = async ({ page = 1, limit = 5 }) => {
  const res = await api.get(`/order?page=${page}&limit=${limit}`);
  return res.data;
};
