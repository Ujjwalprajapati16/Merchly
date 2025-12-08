"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { SearchIcon, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";
import { useAuth } from "@/providers/AuthProvider";
import SearchBar from "@/components/SearchBar";
import MobileSearch from "@/components/MobileSearch";

const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={22}
    height={22}
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
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const containerRef = useRef<HTMLElement>(null);
    const { theme, setTheme } = useTheme();
    const { user, logout } = useAuth();

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
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

    const getInitials = (name: string | undefined, email: string) => {
      if (name) {
        const parts = name.trim().split(" ");
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
      }
      return email.slice(0, 2).toUpperCase();
    };

    return (
      <>
        <header
          ref={combinedRef}
          className={cn(
            "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            className
          )}
          {...props}
        >
          <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 gap-5">

            {/* ------------------ LOGO ------------------ */}
            <Logo />

            {/* ------------------ DESKTOP NAV ------------------ */}
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList className="flex gap-6">
                  {(navigationLinks ||
                    (user?.role === "admin"
                      ? [
                        { href: "/products", label: "Products" },
                        { href: "/categories", label: "Categories" },
                        { href: "/admin/", label: "Dashboard" },
                        { href: "/admin/inventory", label: "Inventory" },
                      ]
                      : [
                        { href: "/products", label: "Products" },
                        { href: "/categories", label: "Categories" },
                        { href: "/orders", label: "Orders" },
                        { href: "/wishlist", label: "Wishlist" },
                      ])
                  ).map((link, i) => (
                    <NavigationMenuItem key={i}>
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

            {/* ------------------ DESKTOP SEARCH ------------------ */}
            <div className="hidden md:flex w-full max-w-sm mx-auto">
              <SearchBar />
            </div>

            {/* ------------------ RIGHT ACTIONS ------------------ */}
            <div className="flex items-center gap-2">

              {/* ---------- MOBILE SEARCH ICON ---------- */}
              {isMobile && (
                <Button
                  onClick={() => setMobileSearchOpen(true)}
                  className="md:hidden p-2 rounded-full bg-transparent text-muted-foreground hover:text-foreground"
                >
                  <SearchIcon size={22} />
                </Button>
              )}

              {/* ---------- USER DROPDOWN ---------- */}
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
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      Sign In
                    </Button>
                  </Link>
                )
              ) : (
                <div className="h-9 w-9" aria-hidden />
              )}

              {/* ---------- CART BUTTON ---------- */}
              {mounted && user?.role !== "admin" && (
                <Link href="/cart">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="relative flex items-center justify-center"
                  >
                    🛒
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 rounded-full bg-primary text-white text-xs w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}

              {/* ---------- THEME SWITCH (DESKTOP ONLY) ---------- */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="hidden md:flex"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </Button>
              )}

              {/* ---------- MOBILE MENU ---------- */}
              {isMobile && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-2">
                      <HamburgerIcon />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="end" className="w-48 p-2">
                    <nav className="flex flex-col gap-2">
                      {(user?.role === "admin"
                        ? [
                          { href: "/products", label: "Products" },
                          { href: "/categories", label: "Categories" },
                          { href: "/admin", label: "Dashboard" },
                          { href: "/admin/inventory", label: "Inventory" },
                        ]
                        : [
                          { href: "/products", label: "Products" },
                          { href: "/categories", label: "Categories" },
                          { href: "/orders", label: "Orders" },
                          { href: "/wishlist", label: "Wishlist" },
                        ]
                      ).map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          className="text-sm font-medium hover:text-primary transition"
                        >
                          {link.label}
                        </Link>
                      ))}

                      {/* ---------- MOBILE THEME TOGGLE ---------- */}
                      <button
                        className="flex items-center justify-between text-sm font-medium mt-2 p-2 rounded-md hover:bg-muted transition"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      >
                        <span>Theme</span>
                        {theme === "light" ? (
                          <Moon size={18} className="text-muted-foreground" />
                        ) : (
                          <Sun size={18} className="text-muted-foreground" />
                        )}
                      </button>

                      {/* ---------- AUTH ---------- */}
                      {!user && (
                        <Link href="/login">
                          <Button variant="ghost" size="sm" className="w-full mt-2">
                            Sign In
                          </Button>
                        </Link>
                      )}

                      {user && (
                          <button
                            onClick={logout}
                            className="text-sm font-medium text-red-600 hover:text-red-700 transition"
                          >
                            Logout
                          </button>
                      )}
                    </nav>
                  </PopoverContent>
                </Popover>
              )}

            </div>
          </div>
        </header>
        <MobileSearch
          open={mobileSearchOpen}
          onClose={() => setMobileSearchOpen(false)}
        />
      </>
    );
  }
);

Navbar04.displayName = "Navbar04";
export default Navbar04;
