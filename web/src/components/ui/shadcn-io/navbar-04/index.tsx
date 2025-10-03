"use client";

import * as React from "react";
import { useEffect, useState, useRef, useId } from "react";
import { SearchIcon, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";

const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

export interface Navbar04NavItem {
  href: string;
  label: string;
}

export interface Navbar04Props extends React.HTMLAttributes<HTMLElement> {
  navigationLinks?: Navbar04NavItem[];
  cartCount?: number;
}

const defaultNavigationLinks: Navbar04NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
];

export const Navbar04 = React.forwardRef<HTMLElement, Navbar04Props>(
  (
    {
      className,
      navigationLinks = defaultNavigationLinks,
      cartCount = 2,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const searchId = useId();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setIsMobile(window.innerWidth < 768);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("search") as string;
      console.log("Search query:", query);
    };

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:block"
          >
            <Input
              id={searchId}
              name="search"
              className="h-9 ps-8 pe-2 w-56"
              placeholder="Search..."
              type="search"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-2 text-muted-foreground">
              <SearchIcon size={16} />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/cart">
              <Button size="sm" className="relative">
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-primary text-white text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Theme Switch */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {/* Mobile Menu */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-2">
                  <nav className="flex flex-col gap-2">
                    {navigationLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-sm font-medium hover:text-primary transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/login"
                      className="text-sm font-medium hover:text-primary transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/cart"
                      className="text-sm font-medium hover:text-primary transition"
                    >
                      Cart ({cartCount})
                    </Link>
                  </nav>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Navbar04.displayName = "Navbar04";
export default Navbar04;
