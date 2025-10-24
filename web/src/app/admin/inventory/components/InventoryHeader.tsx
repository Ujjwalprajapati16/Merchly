"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductCategories } from "@/hooks/useProducts";

interface Category {
    category: string;
    count: number;
}

interface InventoryHeaderProps {
    filterCategory: string;
    setFilterCategory: (value: string) => void;
    onAddProduct?: () => void;
}

export default function InventoryHeader({
    filterCategory,
    setFilterCategory,
    onAddProduct,
}: InventoryHeaderProps) {
    const { data, isLoading, isError } = useProductCategories();

    const categories: Category[] = data ?? [];

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Category Filter */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                {isLoading ? (
                    <Skeleton className="h-10 w-[180px]" />
                ) : isError ? (
                    <p className="text-sm text-red-500">⚠️ Failed to load categories</p>
                ) : (
                    <Select
                        value={filterCategory}
                        onValueChange={(value) => setFilterCategory(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {categories.map((cat) => {
                                const formattedName =
                                    cat.category.charAt(0).toUpperCase() + cat.category.slice(1).toLowerCase();

                                return (
                                    <SelectItem key={cat.category} value={cat.category.toLowerCase()}>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-medium">{formattedName}</span>
                                            <span className="text-xs text-muted-foreground">({cat.count})</span>
                                        </div>
                                    </SelectItem>
                                );
                            })}

                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Add Product Button */}
            <Button
                className="gap-2"
                onClick={onAddProduct}
                disabled={!onAddProduct}
            >
                <Plus className="w-4 h-4" />
                Add Product
            </Button>
        </header>
    );
}
