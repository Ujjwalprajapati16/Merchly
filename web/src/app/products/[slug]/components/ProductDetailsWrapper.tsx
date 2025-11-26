import { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { ProductInfo } from "./ProductInfo";
import { ProductResponse, Variant } from "@/types/productTypes";

interface ProductDetailsWrapperProps {
  product: ProductResponse;
}

export function ProductDetailsWrapper({ product }: ProductDetailsWrapperProps) {
  const baseProduct = product.product; 

  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    baseProduct.variants[0]
  );

  return (
    <>
      <ProductCarousel
        images={baseProduct.variants.map((v) => v.image) as string[]}
        variants={baseProduct.variants}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
      />

      <ProductInfo
        product={baseProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        isInWishlist={product.isInWishlist} 
      />
    </>
  );
}
