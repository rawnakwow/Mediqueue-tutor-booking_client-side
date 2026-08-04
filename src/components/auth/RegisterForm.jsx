"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const validPassword =
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(
        formData.password
      );

    if (!validPassword) {
      toast.error(
        "Password needs 6 characters, one uppercase and one lowercase letter."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/server-api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            photo: formData.photo.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Registration failed."
        );
      }

      if (!data?.user || !data?.token) {
        throw new Error(
          "The server did not return a user and token."
        );
      }

      login(data.user, data.token);

      toast.success("Registration successful.");

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to register."
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
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={loading}
        className="rounded-xl border p-3"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
        className="rounded-xl border p-3"
      />

      <input
        name="photo"
        type="url"
        placeholder="Photo URL"
        value={formData.photo}
        onChange={handleChange}
        disabled={loading}
        className="rounded-xl border p-3"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
        className="rounded-xl border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary p-3 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}