import mongoose from "mongoose";
import { findCartByUserId, createEmptyCart, saveCart } from "../repositories/cart-repo.ts";
import { findProductById } from "../repositories/product-repo.ts";
import type { Cart, CartItem } from "../types/Cart-types.ts";
import type { Variant } from "../types/Product-types.ts";

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