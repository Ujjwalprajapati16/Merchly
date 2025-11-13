import type { User } from "./User-types.ts";

export type WishlistItemType = {
  _id?: string;
  productId: string;
  addedAt?: Date;
}

export type WishlistType = {
  _id?: string;
  user: User;
  items: WishlistItemType[];
  createdAt?: Date;
  updatedAt?: Date;
}
