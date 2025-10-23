"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Variant } from "@/types/productTypes";
import { CarouselApi } from "@/components/ui/carousel"; 

interface ProductCarouselProps {
  images: string[];
  variants: Variant[];
  selectedVariant: Variant;
  onVariantChange: (variant: Variant) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images,
  variants,
  selectedVariant,
  onVariantChange,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(
    variants.findIndex((v) => v.image === selectedVariant.image) || 0
  );

  React.useEffect(() => {
    const index = variants.findIndex((v) => v.image === selectedVariant.image);
    if (index !== -1 && index !== currentIndex) {
      setCurrentIndex(index);
      api?.scrollTo(index);
    }
  }, [selectedVariant, variants, api, currentIndex]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrentIndex(newIndex);
      onVariantChange(variants[newIndex]);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, variants, onVariantChange]);

  return (
    <Carousel
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden border shadow-md"
      setApi={setApi}
    >
      <CarouselContent>
        {images.map((src, i) => (
          <CarouselItem key={i} className="flex items-center justify-center">
            <Image
              src={src}
              alt={`Product image ${i + 1}`}
              width={400}
              height={400}
              className="object-contain w-full h-[400px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default ProductCarousel;
