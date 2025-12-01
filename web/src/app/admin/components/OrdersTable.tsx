"use client";

import { useState, useMemo } from "react";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useAdminActions";
import { AdminOrder } from "@/types/orderTypes";
import OrdersTableSkeleton from "./skeleton/OrdersTableSkeleton";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

const sortOptions = [
    { label: "Recent First", value: "recent" },
    { label: "Received", value: "received" },
    { label: "Shipped", value: "shipped" },
    { label: "Out For Delivery", value: "out_for_delivery" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
];

export default function OrdersTable() {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("recent");

    const { data, isLoading } = useAdminOrders(page, 6);
    const updateStatus = useUpdateOrderStatus();

    
    const orders: AdminOrder[] = data?.orders || [];
    const sortedOrders = useMemo(() => {
        if (sort === "recent") {
            return [...orders].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }

        return [...orders].sort((a, b) => {
            if (a.status === sort && b.status !== sort) return -1;
            if (b.status === sort && a.status !== sort) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [orders, sort]);
    
    if (isLoading) return <OrdersTableSkeleton />;
    return (
        <Card className="shadow-md h-full">
            <CardHeader>
                <CardTitle className="text-lg flex justify-between">
                    Orders
                    <Select onValueChange={setSort} defaultValue="recent">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort orders" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col h-full">
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Total Items</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Change Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {sortedOrders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order.userId.name}</TableCell>
                                    <TableCell>{order.products.length}</TableCell>
                                    <TableCell className="capitalize">{order.status}</TableCell>

                                    <TableCell>
                                        <Select
                                            disabled={order.status === "cancelled" || order.status === "delivered"}
                                            onValueChange={(status) =>
                                                updateStatus.mutate({ orderId: order._id, status })
                                            }
                                        >
                                            <SelectTrigger
                                                className={`w-[150px] ${order.status === "cancelled" && "opacity-50"
                                                    }`}
                                            >
                                                <SelectValue placeholder="Update" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sortOptions.map((s) => (
                                                    <SelectItem key={s.value} value={s.value}>
                                                        {s.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* PAGINATION CONTROLS */}
                {data?.totalPages > 1 && (
                    <div className="mt-auto pt-4 flex items-center justify-between">
                        {/* Previous Button */}
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Previous
                        </Button>

                        {/* Page indicators */}
                        <div className="flex gap-2">
                            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                                <Button
                                    key={p}
                                    variant={p === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </Button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <Button
                            variant="outline"
                            disabled={page === data.totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
