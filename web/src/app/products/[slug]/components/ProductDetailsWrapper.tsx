import { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { ProductInfo } from "./ProductInfo";
import { Product, Variant } from "@/types/productTypes";

interface ProductDetailsWrapperProps {
  product: Product;
}

export function ProductDetailsWrapper({ product }: ProductDetailsWrapperProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);

  return (
    <>
      <ProductCarousel
        images={product.variants.map((v) => v.image)}
        variants={product.variants}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
      />

      <ProductInfo
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </>
  );
}
