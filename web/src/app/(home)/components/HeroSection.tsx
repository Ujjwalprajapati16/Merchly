"use client";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black">
      {/* Slider container */}
      <div className="absolute top-0 left-0 flex w-[600%] h-full animate-slide-slow">
        <Image
          src="/hero-section-1.webp"
          alt="Hero 1"
          width={1920}
          height={1080}
          className="w-1/6 h-full object-cover"
        />
        <Image
          src="/hero-section-2.webp"
          alt="Hero 2"
          width={1920}
          height={1080}
          className="w-1/6 h-full object-cover"
        />
        <Image
          src="/hero-section-3.webp"
          alt="Hero 3"
          width={1920}
          height={1080}
          className="w-1/6 h-full object-cover"
        />
        {/* duplicate for smooth infinite scrolling */}
        <Image
          src="/hero-section-1.webp"
          alt="Hero 1 duplicate"
          width={1920}
          height={1080}
          className="w-1/6 h-full object-cover"
        />
        <Image
          src="/hero-section-2.webp"
          alt="Hero 2 duplicate"
          width={1920}
          height={1080}
          className="w-1/6 h-full object-cover"
        />
        <Image
          src="/hero-section-3.webp"
          alt="Hero 3 duplicate"
          width={1920}
          height={1080}
          className="w-1/6 h-full object-cover"
        />
      </div>

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Site</h1>
        <p className="mt-4 text-lg md:text-xl">Discover amazing content below</p>
      </div>
    </section>
  );
};

export default HeroSection;
