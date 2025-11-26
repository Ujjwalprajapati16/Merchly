"use client";

import Image from "next/image";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      {/* Empty wishlist illustration */}
      <Image
        src="/empty-wishlist.svg"
        alt="Empty Wishlist"
        width={250}
        height={250}
        className="opacity-90 mb-6"
      />

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-2">Your Wishlist is Empty</h2>

      {/* Subtitle */}
      <p className="text-muted-foreground max-w-md text-sm">
        Tap the ❤️ icon on any product to save it to your wishlist and view it here later.
      </p>
    </div>
  );
}
