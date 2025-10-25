"use client";

import { useState } from "react";
import { useAddProduct } from "@/hooks/useAdminActions";
import { VariantFields } from "./VariantFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProductCategories } from "@/hooks/useProducts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AddProductForm({ onClose }: { onClose: () => void }) {
    const { mutateAsync: addProduct, isPending } = useAddProduct();
    const [variants, setVariants] = useState([{ color: "", size: "", image: null }]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
    });

    const { data: categories, isLoading: loadingCategories } = useProductCategories();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.price || !formData.category) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("price", formData.price);
            data.append("description", formData.description);
            data.append("category", formData.category);

            // ✅ Build variant JSON (without image)
            const variantPayload = variants.map(({ color, size }) => ({ color, size }));
            data.append("variants", JSON.stringify(variantPayload));

            // ✅ Attach all variant images (in same order)
            variants.forEach((v) => {
                if (v.image) data.append("images", v.image);
            });

            await addProduct(data);
            toast.success("✅ Product added successfully!");
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to add product");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            {/* Product Name */}
            <Input
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            {/* Price */}
            <Input
                placeholder="Price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
            />

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Category</label>
                <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={loadingCategories ? "Loading..." : "Select Category"} />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((cat: any) => (
                            <SelectItem key={cat.category} value={cat.category}>
                                {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)} ({cat.count})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Description */}
            <textarea
                placeholder="Description"
                className="w-full border rounded-md p-2 text-sm"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {/* Variants */}
            <VariantFields variants={variants} setVariants={setVariants} />

            {/* Submit */}
            <Button type="submit" className="w-full mt-3" disabled={isPending}>
                {isPending ? "Adding..." : "Add Product"}
            </Button>
        </form>
    );
}
