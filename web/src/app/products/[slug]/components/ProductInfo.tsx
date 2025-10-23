import AddToCartButton from "@/components/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Product, Variant } from "@/types/productTypes";
import { toast } from "sonner";

interface ProductInfoProps {
    product: Product;
    selectedVariant: Variant;
    setSelectedVariant: (v: Variant) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
    product,
    selectedVariant,
    setSelectedVariant,
}) => {
    const addWishlist = () => toast.success("Added to wishlist");

    // Get unique colors and sizes
    const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));
    const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

    return (
        <div className="space-y-6">
            {/* Product Name & Price */}
            <div>
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                <p className="text-2xl text-primary mt-2">₹{product.price}</p>
            </div>

            {/* Status */}
            {product.status && (
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm dark:bg-primary/80 dark:text-primary-foreground">
                    {product.status === "available" ? "Available" : "Sold Out"}
                </span>
            )}

            {/* Description */}
            <p className="text-muted-foreground dark:text-muted-foreground/80 leading-relaxed">
                Experience premium quality and comfort with our {product.name}.
            </p>

            {/* Color Selector */}
            <div>
                <p className="text-sm font-medium mb-2 dark:text-muted-foreground">Color:</p>
                <div className="flex gap-2 flex-wrap">
                    {uniqueColors.map((color) => {
                        const variant = product.variants.find((v) => v.color === color)!;
                        return (
                            <button
                                key={color}
                                className={`px-3 py-1 border rounded-lg text-sm transition 
                  ${selectedVariant.color === color
                                        ? "bg-primary text-white border-primary dark:bg-primary/80 dark:text-primary-foreground"
                                        : "bg-muted text-muted-foreground border-border dark:bg-muted/20 dark:text-muted-foreground/80 dark:border-border"
                                    }`}
                                onClick={() => setSelectedVariant(variant)}
                            >
                                {color}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Size Selector */}
            <div>
                <p className="text-sm font-medium mb-2 dark:text-muted-foreground">Size:</p>
                <div className="flex gap-2 flex-wrap">
                    {uniqueSizes.map((size) => {
                        const variant = product.variants.find((v) => v.size === size)!;
                        return (
                            <button
                                key={size}
                                className={`px-3 py-1 border rounded-lg text-sm transition 
                  ${selectedVariant.size === size
                                        ? "bg-primary text-white border-primary dark:bg-primary/80 dark:text-primary-foreground"
                                        : "bg-muted text-muted-foreground border-border dark:bg-muted/20 dark:text-muted-foreground/80 dark:border-border"
                                    }`}
                                onClick={() => setSelectedVariant(variant)}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <AddToCartButton />
                <Button onClick={addWishlist} variant="outline">
                    Add to Wishlist
                </Button>
            </div>
        </div>
    );
};
