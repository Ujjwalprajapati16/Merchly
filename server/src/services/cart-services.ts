import { findCartByUserId, createEmptyCart, saveCart } from "../repositories/cart-repo.ts";
import { findProductById } from "../repositories/product-repo.ts";
import type { Cart } from "../types/Cart-types.ts";
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