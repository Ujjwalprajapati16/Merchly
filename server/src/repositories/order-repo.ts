import type { OrderType } from "../types/Order-types.ts";
import Order from "../models/order-models.ts";

export const createOrder = async (orderData: Partial<OrderType>) => {
  const order = new Order(orderData);
  return await order.save();
};

export const getOrdersByUserId = async (userId: string, skip: number, limit: number) => {
  const [orders, totalOrders] = await Promise.all([
    Order.find({ userId })
      .populate("products.productId", "name price")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Order.countDocuments({ userId }),
  ]);

  return { orders, totalOrders };
};

export const findOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId)
    .populate("userId", "name email")
    .populate("products.productId", "name price slug category");

  return order;
};

export const cancelOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) return null;

  order.status = "cancelled";
  await order.save();

  return order;
};

export const getAllOrdersAdminRepo = async (skip: number, limit: number) => {
    const [orders, totalOrders] = await Promise.all([
        Order.find({})
            .populate("userId", "name email")
            .populate("products.productId", "name price")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Order.countDocuments(),
    ]);

    return { orders, totalOrders };
};

export const updateOrderStatusRepo = async (orderId: string, status: string) => {
    return await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    )
        .populate("userId", "name email")
        .populate("products.productId", "name price");
};
