"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  href = "/",
  className,
  width = 150,
  height = 150,
}: LogoProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center no-underline",
        className
      )}
    >
      <Image
        src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Logo"
        width={width}
        height={height}
        priority
        className="object-contain select-none"
      />
    </Link>
  );
}
