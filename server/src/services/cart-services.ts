import { findCartByUserId, createEmptyCart } from "../repositories/cart-repo.ts";
import type { Cart } from "../types/Cart-types.ts";

export const getCartByUserId = async (userId: string): Promise<Cart> => {
    let cart = await findCartByUserId(userId);

    if (!cart) {
        cart = await createEmptyCart(userId);
    }

    return cart.toObject();
};