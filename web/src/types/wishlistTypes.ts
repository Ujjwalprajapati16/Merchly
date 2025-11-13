export type WishlistItem = {
  productId: string;
  addedAt: Date;
}

export type WishlistType = {
  _id: string;
  user: string;
  items: WishlistItem[];
}
