"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("access-token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Authentication restore error:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("access-token");

      setUser(null);
      setToken(null);
    } finally {
      setIsPending(false);
    }
  }, []);

  const login = useCallback((userData, jwtToken) => {
    if (!userData || !jwtToken) {
      throw new Error("User information and JWT are required.");
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access-token", jwtToken);

    setUser(userData);
    setToken(jwtToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");

    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isPending,
      isAuthenticated: Boolean(user && token),
    }),
    [user, token, login, logout, isPending]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;