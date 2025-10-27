import type { Product, Variant } from "./Product-types.ts";
import type { User } from "./User-types.ts";

export type Cart = {
    _id: string;
    user: User;
    items: CartItem[];
    total: number;
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