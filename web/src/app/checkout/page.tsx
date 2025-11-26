"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { usePreferredAddress } from "@/hooks/useAddress";
import { useCheckoutCart } from "@/hooks/useCart";
import AddressSection from "./components/AddressSection";
import OrderSummary from "./components/OrderSummary";
import PlaceOrderButton from "./components/PlaceOrderButton";
import SkeletonCheckoutPage from "./components/skeleton/SkeletonCheckoutPage";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: address, isLoading: addrLoading } = usePreferredAddress();
  const checkoutMutation = useCheckoutCart();

  if (cartLoading || addrLoading) return <SkeletonCheckoutPage />;

  const handlePlaceOrder = () => {
    checkoutMutation.mutate(undefined, {
      onSuccess: (order) => {
        router.push(`/orders/${order._id}`);
      },
    });
  };

  return (
    <div className="container mx-auto max-w-5xl py-10 flex flex-col gap-8">
      <AddressSection address={address} />
      <OrderSummary cart={cart} />
      <PlaceOrderButton
        isLoading={checkoutMutation.isPending}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
