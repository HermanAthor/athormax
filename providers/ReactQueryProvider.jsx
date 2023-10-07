"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

export function ReactQueryProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
