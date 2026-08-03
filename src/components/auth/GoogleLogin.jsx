"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/signin?error=google-login",
        newUserCallbackURL: "/",
      });

      if (result?.error) {
        throw new Error(
          result.error.message ||
            "Google authentication could not start."
        );
      }

      /*
       * Better Auth normally redirects the browser to Google.
       * This code executes only when no immediate redirect occurs.
       */
      if (!result?.data) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Google login error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Google login failed."
      );

      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-divider bg-background px-4 py-3 font-medium text-foreground transition hover:bg-default-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
      >
        <path
          fill="#4285F4"
          d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.35Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.98-.9 6.64-2.42l-3.24-2.51c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.59A10 10 0 0 0 12 22Z"
        />
        <path
          fill="#FBBC05"
          d="M6.39 13.9A6 6 0 0 1 6.08 12c0-.66.11-1.3.31-1.9V7.51H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.49l3.35-2.59Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.97c1.47 0 2.79.51 3.83 1.5l2.88-2.88C16.97 2.97 14.7 2 12 2a10 10 0 0 0-8.96 5.51l3.35 2.59C7.18 7.73 9.39 5.97 12 5.97Z"
        />
      </svg>

      <span>
        {loading ? "Opening Google..." : "Continue with Google"}
      </span>
    </button>
  );
}