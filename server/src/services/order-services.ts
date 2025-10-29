import mongoose from "mongoose";
import { BadRequest } from "../middlewares/ErrorHandler.ts";
import { getPreferredAddressByUserId } from "../repositories/address-repo.ts";
import { createOrder } from "../repositories/order-repo.ts";
import { findProductById } from "../repositories/product-repo.ts";

export const buyNowService = async (userId: string, productId: string, quantity: number) => {
    const product = await findProductById(productId);
    if (!product) throw new BadRequest("Product not found");

    // todo: update stock in product
    // if (product.stock < quantity) throw new BadRequest("Insufficient stock");

    const address = await getPreferredAddressByUserId(userId);
    if (!address) throw new BadRequest("No preferred address found");

    const total = product.price * quantity;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const orderData = {
        userId: userObjectId,
        products: [
            {
                productId: productObjectId,
                quantity,
                price: product.price,
                subtotal: total,
            },
        ],
        total,
        status: "received" as const,
        payment_status: "pending" as const,
        address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
        },
    };

    const order = await createOrder(orderData);

    // (Optional) reduce product stock
    //   product.stock -= quantity;
    //   await product.save();

    return order;
};
