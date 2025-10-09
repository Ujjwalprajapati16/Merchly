"use client";

// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation.js";
import { RiInstagramFill, RiTwitterFill, RiGithubFill, RiFacebookFill } from "react-icons/ri";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: <RiInstagramFill className="w-5 h-5" />, href: "https://instagram.com" },
  { icon: <RiTwitterFill className="w-5 h-5" />, href: "https://twitter.com" },
  { icon: <RiGithubFill className="w-5 h-5" />, href: "https://github.com" },
  { icon: <RiFacebookFill className="w-5 h-5" />, href: "https://facebook.com" },
];

const Footer = () => {
  const pathname = usePathname();

  const hideOnRoutes = ["/login", "/signup"];
  if (hideOnRoutes.includes(pathname)) {
    return null;
  }

  return (
    <footer className="w-full bg-background border-t border-border/40 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Brand & Description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Merchly</h2>
          <p className="text-muted-foreground max-w-xs">
            Handpicked merch designed to elevate your style and keep you comfortable all day.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <h3 className="text-lg font-medium mb-2">Subscribe</h3>
          <p className="text-muted-foreground text-sm mb-2">
            Get updates on our latest products.
          </p>
          <div className="flex gap-2">
            <Input placeholder="Email" type="email" className="flex-1" />
            <Button variant="default">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MechLab. Crafted with ❤️ by Ujjwal.
      </div>
    </footer>
  );
};

export default Footer;
