"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch("/server-api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Invalid email or password."
        );
      }

      if (!data?.user || !data?.token) {
        console.error("Unexpected login response:", data);

        throw new Error(
          "The server did not return user information and a JWT."
        );
      }

      // Saves user and access-token through AuthContext
      login(data.user, data.token);

      toast.success("Login successful.");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={loading}
          className="w-full rounded-xl border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          disabled={loading}
          className="w-full rounded-xl border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}