"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import InventoryHeader from "./components/InventoryHeader";
import ProductTable from "./components/ProductTable";
import { Product } from "@/types/productTypes";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddProductDialog from "./components/AddProductDialog";

export default function InventoryPage() {
    const [filterCategory, setFilterCategory] = useState("all");
    const [page, setPage] = useState(1);
    const limit = 10;

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const { data, isLoading, isError, refetch } = useProducts(page, limit);

    const products: Product[] = data || [];

    const filteredProducts =
        filterCategory === "all"
            ? products
            : products.filter((p) => p.category === filterCategory);

    // Reset page when filter changes
    useEffect(() => {
        setPage(1);
    }, [filterCategory]);

    return (
        <div className="container mx-auto py-10 space-y-6">
            <InventoryHeader
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                onAddProduct={() => setIsAddDialogOpen(true)}
            />

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center py-10">
                    <p className="text-destructive text-sm mb-2">
                        Failed to load products.
                    </p>
                    <Button variant="outline" onClick={() => refetch()}>
                        Retry
                    </Button>
                </div>
            ) : (
                <>
                    <ProductTable products={filteredProducts} />

                    {/* Simple Pagination */}
                    <div className="flex justify-center mt-6 gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >
                            Previous
                        </Button>

                        <span className="flex items-center px-2 py-1 rounded-lg bg-muted/10 text-sm">
                            Page {page}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={products.length < limit} // if less than limit, it's last page
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
