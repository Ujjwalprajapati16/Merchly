"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/productTypes";
import AddToCartButton from "./AddToCartButton";
import { toast } from "sonner";


const addWishlist = () => {
    toast.success("Added to wishlist");
};

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                <p className="text-2xl text-primary mt-2">{product.price}</p>
            </div>

            {product.badge && (
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm dark:bg-primary/80 dark:text-primary-foreground">
                    {product.badge}
                </span>
            )}

            <p className="text-muted-foreground leading-relaxed">
                Experience premium quality and comfort with our {product.name}. Perfect for your style and everyday use.
            </p>

            <div className="flex gap-4">
                <AddToCartButton />
                <Button
                    onClick={addWishlist}
                    variant="outline">
                    Add to Wishlist
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;
