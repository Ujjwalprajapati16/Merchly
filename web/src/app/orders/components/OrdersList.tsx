"use client";

import { useUserOrders } from "@/hooks/useOrders";
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
import SkeletonOrdersList from "./skeleton/SkeletonOrdersList";
import EmptyOrders from "./EmptyOrders";

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

  if (isLoading) return <SkeletonOrdersList />;

  if (orders.length === 0) {
    return <EmptyOrders />;
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
