// src/providers/ThemeProviders.jsx
"use client";
import { HeroUIProvider } from "@heroui/react";

export default function ThemeProviders({ children }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
