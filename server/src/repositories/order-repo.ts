import type { OrderType } from "../types/Order-types.ts";
import Order from "../models/order-models.ts";

export const createOrder = async (orderData: Partial<OrderType>) => {
  const order = new Order(orderData);
  return await order.save();
};

export const getOrdersByUserId = async (userId: string) => {
  return await Order.find({ userId })
    .populate("products.productId", "name price") 
    .populate("address") 
    .sort({ createdAt: -1 });
};