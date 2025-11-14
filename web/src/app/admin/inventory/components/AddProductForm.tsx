"use client";

import { useAddProduct, useUpdateProduct } from "@/hooks/useAdminActions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProductCategories } from "@/hooks/useProducts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { VariantFields } from "./VariantFields";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/productTypes";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export const variantSchema = z.object({
    color: z.string().min(1, "Color is required"),
    size: z.string().min(1, "Size is required"),
    image: z.any().optional(),
});

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
        .min(1, "Price is required"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export type ProductFormData = z.input<typeof productSchema>;

interface AddEditProductFormProps {
    onClose: () => void;
    product?: Product;
    isEdit?: boolean;
}

export function AddEditProductForm({ onClose, product, isEdit = false }: AddEditProductFormProps) {
    const addMutation = useAddProduct();
    const updateMutation = useUpdateProduct();
    const { data: categories, isLoading: loadingCategories } = useProductCategories();

    const [isLoading, setIsLoading] = useState(false);

    const { control, register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || "",
            price: product?.price?.toString() ?? "",
            description: product?.description || "",
            category: product?.category || "",
            variants: product?.variants?.map((v: any) => ({
                color: v.color,
                size: v.size,
                image: v.image || null,
            })) || [{ color: "", size: "", image: null }],
        },
    });

    const onSubmit = async (data: ProductFormData) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price.toString());
            formData.append("description", data.description || "");
            formData.append("category", data.category);

            // Build variant payload
            const variantsPayload = data.variants.map(({ color, size }) => ({ color, size }));
            formData.append("variants", JSON.stringify(variantsPayload));

            // Attach images:
            // - If new File => append as "images"
            // - If existing string URL => append as "existingImages"
            data.variants.forEach((v, index) => {
                if (v.image instanceof File) {
                    formData.append("images", v.image);
                } else if (typeof v.image === "string" && v.image.length > 0) {
                    formData.append("existingImages", v.image);
                }
            });

            if (isEdit && product) {
                setIsLoading(true);
                await updateMutation.mutateAsync({ id: product._id, formData });
                setIsLoading(false);
            } else {
                setIsLoading(true);
                await addMutation.mutateAsync(formData);
                setIsLoading(false);
            }

            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to submit product");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-4">
            {/* Name */}
            <div>
                <Input placeholder="Product Name" {...register("name")} />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Price */}
            <div>
                <Input placeholder="Price" type="number" step="0.01" {...register("price")} />
                {errors.price && <p className="text-destructive text-xs mt-1">{errors.price.message}</p>}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Category</label>
                <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
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
                    )}
                />
                {errors.category && <p className="text-destructive text-xs mt-1">{errors.category.message}</p>}
            </div>


            {/* Description */}
            <div>
                <textarea
                    placeholder="Description"
                    className="w-full border rounded-md p-2 text-sm"
                    rows={3}
                    {...register("description")}
                />
            </div>

            {/* Variants */}
            <VariantFields control={control} name="variants" />
            {errors.variants && <p className="text-destructive text-xs mt-1">{errors.variants.message?.toString()}</p>}

            {/* Submit */}
            <Button
                type="submit"
                className="w-full mt-3"
                disabled={isLoading}
            >
                {isEdit ?
                    isLoading ? <><Spinner /> Updating...</> : "Update Product" :
                    isLoading ? <><Spinner /> Adding...</> : "Add Product"}
            </Button>
        </form>
    );
}
