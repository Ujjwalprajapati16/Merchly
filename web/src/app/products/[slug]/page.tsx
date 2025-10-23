"use client";

import { useProduct } from "@/hooks/useProducts";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { ProductDetailsWrapper } from "./components/ProductDetailsWrapper";

interface ProductDetailsProps {
  params: { slug: string };
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const slug = params.slug;

  const { data: product, isLoading, isError, refetch } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-10 flex flex-col items-center gap-3 text-center text-muted-foreground">
        <p className="text-sm">Failed to load product details.</p>
        <Button onClick={() => refetch?.()}>Retry</Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-10 text-center text-muted-foreground">
        <p className="text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <ProductDetailsWrapper product={product} />
    </div>
  );
}
