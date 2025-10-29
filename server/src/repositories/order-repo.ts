import type { OrderType } from "../types/Order-types.ts";
import Order from "../models/order-models.ts";

export const createOrder = async (orderData: Partial<OrderType>) => {
  const order = new Order(orderData);
  return await order.save();
};