"use client";

import { ChakraProvider } from "@chakra-ui/react";

export function ChackrauiProvider({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
