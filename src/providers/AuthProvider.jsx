"use client";

import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import AuthProvider  from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" />
      </AuthProvider>
    </HeroUIProvider>
  );
}