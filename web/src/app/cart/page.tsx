"use client";
import { useCart } from "@/hooks/useCart";
import { CartSummary } from "./components/CartSummary";
import { CartItem } from "./components/CartItem";
import { SavedItem } from "./components/SavedItem";

export default function Page() {
  const { data: cart, isLoading } = useCart();

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto max-w-6xl py-10 flex flex-col gap-10">
      
      {/* Cart Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.items.map((item: any) => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={() => console.log("remove", item._id)}
              onSave={() => console.log("save", item._id)}
              onIncrease={() => console.log("inc", item._id)}
              onDecrease={() => console.log("dec", item._id)}
            />
          ))}
        </div>

        <CartSummary total={cart.total} />
      </div>

      {/* Saved For Later Section */}
      {cart.savedForLater.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Saved for Later</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.savedForLater.map((item: any) => (
              <SavedItem
                key={item._id}
                item={item}
                onMoveToCart={() => console.log("move", item._id)}
                onRemove={() => console.log("remove-saved", item._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
