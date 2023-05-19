"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/ui/Navbar";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface ProvidersProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  return  (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider>
          <SessionProvider>
            <Navbar></Navbar>
            <Box className="bg-primary">{children}</Box>
          </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
};
export default Providers;
