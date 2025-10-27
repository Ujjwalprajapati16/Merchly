import type { Product, Variant } from "./Product-types.ts";
import type { User } from "./User-types.ts";

export type Cart = {
    user: User;
    items: CartItem[];
    total: number;
};

export type CartItem = {
    product: Product;
    variant: Variant;
    quantity: number;
    subtotal: number;
};