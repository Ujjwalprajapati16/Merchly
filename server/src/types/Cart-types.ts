import type { Product, Variant } from "./Product-types.js";
import type { User } from "./User-types.js";

export type Cart = {
    _id: string;
    user: User;
    items: CartItem[];
    total: number;
    savedForLater: CartItem[];
    createdAt: Date;
    updatedAt: Date;
};

export type CartItem = {
    _id: string;
    product: Product;
    variant: Variant;
    quantity: number;
    subtotal: number;
};