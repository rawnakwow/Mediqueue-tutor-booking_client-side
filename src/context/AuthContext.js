"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Let better-auth handle background token refetching and multi-tab syncing
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user || null;

  return (
    <AuthContext.Provider value={{ session, isPending, error, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
