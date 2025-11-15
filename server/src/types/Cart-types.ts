import type { Product, Variant } from "./Product-types";
import type { User } from "./User-types";

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