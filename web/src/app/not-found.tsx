"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        <Image
          src="/not_found.svg" 
          alt="Page not found"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h1 className="mt-8 text-3xl font-semibold text-foreground">Page Not Found</h1>
      <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-sm">
        Sorry, the page you’re looking for doesn’t exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
