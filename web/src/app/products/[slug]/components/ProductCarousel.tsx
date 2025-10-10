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

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  return (
    <Carousel className="w-full max-w-md mx-auto rounded-2xl overflow-hidden border shadow-md">
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
