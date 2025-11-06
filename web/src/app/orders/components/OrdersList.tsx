"use client";

import { useUserOrders } from "@/hooks/useOrders";
import { Loader2 } from "lucide-react";
import OrderCard from "./OrderCard";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

export default function OrdersList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useUserOrders(page);

  const orders = data?.orders || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;

  const goToPage = (p: number) => {
    router.push(`/orders?page=${p}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (orders.length === 0) {
    return <p className="text-gray-500 text-center py-8">No orders found.</p>;
  }

  return (
    <div className="space-y-6">
      {/* ✅ Orders List */}
      <div className="space-y-4">
        {orders.map((order: any) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>

      {/* ✅ Pagination */}
      <Pagination>
        <PaginationContent className="flex justify-center">

          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            />
          </PaginationItem>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
              onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
}
