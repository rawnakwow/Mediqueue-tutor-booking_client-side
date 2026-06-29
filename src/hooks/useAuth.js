import { useAuthContext } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { session, isPending, error, user } = useAuthContext();

  // Correct API paths using the standard Better-Auth layout structures:
  const login = async (email, password) => {
    return await authClient.signIn.email({ email, password });
  };

  const register = async (email, password, name, image) => {
    return await authClient.signUp.email({ email, password, name, image });
  };

  const logout = async (options) => {
    return await authClient.signOut(options);
  };

  const loginWithGoogle = async (callbackURL = "/") => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  return {
    session,
    isPending,
    error,
    user,
    login,
    register,
    logout,
    loginWithGoogle,
  };
}
