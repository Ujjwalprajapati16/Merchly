import mongoose from "mongoose";
import { findCartByUserId, createEmptyCart, saveCart } from "../repositories/cart-repo.ts";
import { findProductById } from "../repositories/product-repo.ts";
import type { Cart, CartItem } from "../types/Cart-types.ts";
import type { Variant } from "../types/Product-types.ts";
import { BadRequest } from "../middlewares/ErrorHandler.ts";
import { getPreferredAddressByUserId } from "../repositories/address-repo.ts";
import { createOrder } from "../repositories/order-repo.ts";
import type { OrderType } from "../types/Order-types.ts";

export const getCartByUserId = async (userId: string): Promise<Cart> => {
    let cart = await findCartByUserId(userId);

    if (!cart) {
        cart = await createEmptyCart(userId);
    }

    return cart.toObject();
};

export const addItemToCartService = async (
    userId: string,
    productId: string,
    variant: Variant,
    quantity: number
) => {
    let cart = await findCartByUserId(userId);
    if (!cart) {
        cart = await createEmptyCart(userId);
    }

    const product = await findProductById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    const existingItem = cart.items.find(
        (item: any) =>
            item.product.toString() === productId &&
            item.variant.color === variant.color &&
            item.variant.size === variant.size
    );

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subtotal = product.price * existingItem.quantity;
    } else {
        cart.items.push({
            _id: new mongoose.Types.ObjectId().toString(),
            product: product,
            variant,
            quantity,
            subtotal: product.price * quantity,
        });
    }

    // Update cart total
    cart.total = cart.items.reduce((sum: number, item: any) => sum + item.subtotal, 0);

    const updatedCart = await saveCart(cart);
    return updatedCart.toObject();
};

export const updateCartItemQuantity = async (userId: string, itemId: string, quantity: number) => {
    const cart = await findCartByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find((it: any) => {
        if (it._id && typeof it._id === "object" && typeof (it._id as any).toString === "function") {
            return (it._id as any).toString() === itemId;
        }
        return it._id === itemId;
    });

    if (!item) throw new Error("Item not found in cart");

    item.quantity = quantity;

    // Recalculate subtotal for this item
    const productPrice = (item.product as any)?.price ?? 0;
    item.subtotal = productPrice * quantity;

    // Recalculate total for the entire cart
    cart.total = cart.items.reduce((acc: number, it: CartItem) => acc + it.subtotal, 0);

    await cart.save();
    return cart;
};

export const removeItemFromCartService = async (userId: string, itemId: string) => {
    const cart = await findCartByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find((it: any) => {
        if (it._id && typeof it._id === "object" && typeof (it._id as any).toString === "function") {
            return (it._id as any).toString() === itemId;
        }
        return it._id === itemId;
    });
    if (!item) throw new Error("Item not found in cart");

    item.deleteOne(); // Mongoose subdocument removal

    // Recalculate total
    cart.total = cart.items.reduce(
        (sum: number, i: CartItem) => sum + i.subtotal,
        0
    );

    await cart.save();
    return cart;
};

export const clearUserCartService = async (userId: string) => {
    const cart = await findCartByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    cart.items = [];
    cart.total = 0;

    const updatedCart = await saveCart(cart);
    return updatedCart.toObject();
};

export const saveItemForLaterService = async (userId: string, itemId: string) => {
    const cart = await findCartByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    if (!cart.savedForLater) {
        (cart as Cart).savedForLater = [];
    }

    const item = cart.items.find((it: any) => {
        if (it._id && typeof it._id === "object" && typeof (it._id as any).toString === "function") {
            return (it._id as any).toString() === itemId;
        }
        return it._id === itemId;
    });
    if (!item) throw new Error("Item not found in cart");

    (cart as any).savedForLater.push(item.toObject());
    item.deleteOne();

    // Recalculate total
    cart.total = cart.items.reduce((sum: number, i: CartItem) => sum + i.subtotal, 0);

    const updatedCart = await saveCart(cart);
    return updatedCart.toObject();
};

export const moveItemBackToCartService = async (userId: string, itemId: string) => {
    const cart = await findCartByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    const savedItem = (cart.savedForLater || []).id(itemId);
    if (!savedItem) throw new Error("Item not found in saved items");

    // Check if same product + variant already exists in cart
    const existingItem = cart.items.find(
        (i: any) =>
            i.product.toString() === savedItem.product.toString() &&
            i.variant.color === savedItem.variant.color &&
            i.variant.size === savedItem.variant.size
    );

    if (existingItem) {
        // If already exists, just increase the quantity
        existingItem.quantity += savedItem.quantity;
        existingItem.subtotal =
            ((existingItem.product as any)?.price ?? 0) * existingItem.quantity;
    } else {
        // Otherwise, move it back to cart
        cart.items.push(savedItem.toObject());
    }

    // Remove from savedForLater
    savedItem.deleteOne();

    // Update total
    cart.total = cart.items.reduce(
        (sum: number, i: CartItem) => sum + i.subtotal,
        0
    );

    const updatedCart = await saveCart(cart);
    return updatedCart.toObject();
};

export const checkoutCartService = async (userId: string) => {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // 🛒 Fetch user's cart
    const cart = await getCartByUserId(userId);
    if (!cart || cart.items.length === 0) throw new BadRequest("Cart is empty");

    // 📦 Get delivery address
    const address = await getPreferredAddressByUserId(userId);
    if (!address) throw new BadRequest("No preferred address found");

    // 💰 Calculate totals
    const totalAmount = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    // 🧩 Build order data
    const orderData: Partial<OrderType> = {
        userId: userObjectId,
        products: cart.items.map((i) => ({
            productId: new mongoose.Types.ObjectId(i.product._id),
            quantity: i.quantity,
            color: i.variant?.color || "N/A",
            size: i.variant?.size || "N/A",
            image: i.variant?.image || i.product.variants[0]?.image || "",
            price: i.product.price,
            subtotal: i.subtotal,
        })),
        total: totalAmount,
        status: "received",
        payment_status: "pending",
        address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
        },
    };

    // 🧾 Create order in DB
    const order = await createOrder(orderData);

    // 🧹 Clear the user's cart
    await clearUserCartService(userId);

    return order;
};
