"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCancelOrder } from "@/hooks/useOrders";
import { useRouter } from "next/navigation";

export function CancelOrderButton({ orderId, status }: { orderId: string; status: string }) {
  const router = useRouter();
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  const canCancel =
    status !== "cancelled" &&
    status !== "delivered" &&
    status !== "shipped";

  if (!canCancel) return null;

  function handleCancel() {
    cancelOrder(orderId);
    router.push("/orders");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full mt-2"
          disabled={isPending}
        >
          {isPending ? "Cancelling..." : "Cancel Order"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="dark:bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">
            Cancel this order?
          </AlertDialogTitle>
          <AlertDialogDescription className="dark:text-neutral-300">
            This action cannot be undone. Are you sure you want to cancel this order?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="dark:bg-neutral-800 dark:text-white">
            Close
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Yes, Cancel Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
