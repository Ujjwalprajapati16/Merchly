import Image from "next/image";
import Link from "next/link";
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
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center justify-center no-underline", className)}
    >
      <Image
        src="/logo-light.png"
        alt="Logo"
        width={width}
        height={height}
        priority
        className="object-contain select-none dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        alt="Logo"
        width={width}
        height={height}
        priority
        className="object-contain select-none hidden dark:inline-block"
      />
    </Link>
  );
}
