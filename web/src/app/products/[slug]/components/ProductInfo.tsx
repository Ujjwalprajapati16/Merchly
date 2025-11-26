import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import { Button } from "@/components/ui/button";
import { Product, Variant } from "@/types/productTypes";

interface ProductInfoProps {
  product: Product;
  selectedVariant: Variant;
  setSelectedVariant: (v: Variant) => void;
  isInWishlist: boolean;  
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedVariant,
  setSelectedVariant,
  isInWishlist,
}) => {
  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  return (
    <div className="space-y-6">
      {/* Product Name & Price + Wishlist Button */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-2xl text-primary mt-2">₹{product.price}</p>
        </div>

        {/* ❤️ Correct Wishlist Behavior */}
        <WishlistButton 
          productId={product._id}
          initialState={isInWishlist} 
        />
      </div>

      {/* Status */}
      {product.status && (
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm dark:bg-primary/80 dark:text-primary-foreground">
          {product.status === "available" ? "Available" : "Sold Out"}
        </span>
      )}

      {/* Description */}
      <p className="text-muted-foreground dark:text-muted-foreground/80 leading-relaxed">
        {product.description}
      </p>

      {/* Color Selector */}
      <div>
        <p className="text-sm font-medium mb-2 dark:text-muted-foreground">Color:</p>
        <div className="flex gap-2 flex-wrap">
          {uniqueColors.map((color) => {
            const variant = product.variants.find((v) => v.color === color)!;

            return (
              <Button
                key={color}
                className={`px-3 py-1 border rounded-lg text-sm transition 
                  ${
                    selectedVariant.color === color
                      ? "bg-primary text-white border-primary dark:bg-primary/80 dark:text-primary-foreground"
                      : "bg-muted text-muted-foreground border-border dark:bg-muted/20 dark:text-muted-foreground/80 dark:border-border"
                  }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {color}
              </Button>
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
              <Button
                key={size}
                className={`px-3 py-1 border rounded-lg text-sm transition 
                  ${
                    selectedVariant.size === size
                      ? "bg-primary text-white border-primary dark:bg-primary/80 dark:text-primary-foreground"
                      : "bg-muted text-muted-foreground border-border dark:bg-muted/20 dark:text-muted-foreground/80 dark:border-border"
                  }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {size}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <AddToCartButton productId={product._id} variant={selectedVariant} />
      </div>
    </div>
  );
};
