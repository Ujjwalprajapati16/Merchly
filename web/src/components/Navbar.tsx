"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar04 } from "./ui/shadcn-io/navbar-04/index";

const Navbar = () => {
  const pathname = usePathname();

  const hideOnRoutes = ["/login", "/signup"];
  if (hideOnRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar04 />;
};

export default Navbar;
