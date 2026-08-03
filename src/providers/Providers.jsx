"use client";

import ThemeProviders from "@/providers/ThemeProviders";
import AuthProviderWrapper from "@/providers/AuthProvider";

export default function Providers({ children }) {
  return (
    <ThemeProviders>
      <AuthProviderWrapper>{children}</AuthProviderWrapper>
    </ThemeProviders>
  );
}
