"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";
import { useAuth } from "@/providers/AuthProvider";

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

export const Navbar04 = React.forwardRef<HTMLElement, Navbar04Props>(
  ({ className, navigationLinks, cartCount = 2, ...props }, ref) => {
    // IMPORTANT: maintain same initial render between server and client:
    // mounted === false => render a neutral shell that won't mismatch during hydration.
    const [mounted, setMounted] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    // Use a client-only generated search id to avoid useId mismatch
    const [searchId, setSearchId] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const { user, logout } = useAuth();

    // generate stable id and mark mounted on client
    useEffect(() => {
      setMounted(true);
      setSearchId(`search-${Math.random().toString(36).slice(2, 9)}`);
    }, []);

    useEffect(() => {
      // only run resize listener on client
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref && typeof ref === "object") (ref as any).current = node;
      },
      [ref]
    );

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("search") as string;
      // keep behaviour same after hydration
      if (mounted) {
        // do client-side navigation/search logic here
        console.log("Search query:", query);
      }
    };

    const getInitials = (name: string | undefined, email: string) => {
      if (name) {
        const parts = name.trim().split(" ");
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
      }
      return email.slice(0, 2).toUpperCase();
    };

    // Provide a neutral server-like UI before mounted to avoid markup differences.
    // Many dynamic bits (theme icon, user dropdown contents) will only appear after mount.
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
          {/* Logo - safe to render immediately */}
          <Logo />

          {/* Desktop Nav - safe to render (links are static) */}
          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                {(navigationLinks ||
                  (user?.role === "admin"
                    ? [
                        { href: "/products", label: "Products" },
                        { href: "/categories", label: "Categories" },
                        { href: "/admin/dashboard", label: "Dashboard" },
                        { href: "/admin/inventory", label: "Inventory" },
                      ]
                    : [
                        { href: "/products", label: "Products" },
                        { href: "/categories", label: "Categories" },
                        { href: "/orders", label: "Orders" },
                        { href: "/wishlist", label: "Wishlist" },
                      ]))!.map((link, index) => (
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

          {/* Search: render the form, but input id is only available after mount */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Input
              id={searchId || "search"}
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
            {/* User area - render initial shell same on server and client, then hydrate interactive dropdown */}
            {mounted ? (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-9 w-9 font-semibold"
                    >
                      {getInitials(user.name, user.email)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
              )
            ) : (
              // Neutral placeholder to keep server/client markup identical
              <div className="h-9" aria-hidden />
            )}

            {/* Cart - only render after mounted (so server markup is identical) */}
            {mounted && user?.role !== "admin" && (
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
            )}

            {/* Theme Switch - only show after mounted to avoid mismatch */}
            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </Button>
            ) : (
              // neutral placeholder
              <div className="w-9 h-9" aria-hidden />
            )}

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
                    {(navigationLinks ||
                      (user?.role === "admin"
                        ? [
                            { href: "/products", label: "Products" },
                            { href: "/categories", label: "Categories" },
                            { href: "/admin/dashboard", label: "Dashboard" },
                            { href: "/admin/inventory", label: "Inventory" },
                          ]
                        : [
                            { href: "/products", label: "Products" },
                            { href: "/categories", label: "Categories" },
                            { href: "/orders", label: "Orders" },
                            { href: "/wishlist", label: "Wishlist" },
                          ]))!.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-sm font-medium hover:text-primary transition"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {!mounted && (
                      // placeholders to keep layout same initially
                      <div className="h-2" />
                    )}

                    {mounted && !user && (
                      <Link href="/login" className="text-sm font-medium hover:text-primary transition">
                        <Button variant="ghost" size="sm">
                          Sign In
                        </Button>
                      </Link>
                    )}

                    {mounted && user && (
                      <>
                        <Link href="/profile" className="text-sm font-medium hover:text-primary transition">
                          Profile
                        </Link>
                        <Button
                          onClick={logout}
                          className="text-sm text-left font-medium text-red-600 hover:text-red-700 transition"
                        >
                          Logout
                        </Button>
                      </>
                    )}

                    {mounted && user?.role !== "admin" && (
                      <Link href="/cart" className="text-sm font-medium hover:text-primary transition">
                        Cart ({cartCount})
                      </Link>
                    )}
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
