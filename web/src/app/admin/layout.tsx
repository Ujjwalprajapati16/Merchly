"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only apply protection if the path starts with /admin
    if (pathname.startsWith("/admin")) {
      if (!user) {
        router.replace("/"); // Not logged in
      } else if (user.role !== "admin") {
        router.replace("/"); // Logged in but not admin
      }
    }
  }, [user, pathname, router]);

  // While checking user or redirecting, avoid rendering content
  if (pathname.startsWith("/admin") && (!user || user.role !== "admin")) {
    toast.error("You must be an admin to access this page");
    return null;
  }

  return <>{children}</>;
}
