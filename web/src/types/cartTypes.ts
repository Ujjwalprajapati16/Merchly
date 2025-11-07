import { Variant } from "./productTypes";

export type CartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
  };
  variant: {
    color: string;
    size: string;
    image: string;
  };
  quantity: number;
  subtotal: number;
}

export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
  savedForLater: any[];
  createdAt: string;
  updatedAt: string;
}

export type AddToCart = {
  productId: string;
  // quantity: number;
  variant: Variant;
}