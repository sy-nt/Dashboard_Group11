"use client";
import Navbar from "@/components/ui/Navbar";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useRequireAuth from "@/hooks/useRequireAuth";
const Layout = ({ children }: { children: ReactNode }) => {
  const session = useRequireAuth();

  return session&&(<Box className="bg-white text-black" >{children}</Box>);
};

export default Layout;
