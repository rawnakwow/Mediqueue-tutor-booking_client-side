"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";

export default function UpdateProfileForm() {
  const { user, token, login } = useAuth();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setPhoto(user?.photo || user?.photoURL || "");
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !token) {
      toast.error("Your login session is missing.");
      return;
    }

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const updatedUser = {
        ...user,
        name: name.trim(),
        photo: photo.trim(),
      };

      // Update AuthContext and localStorage
      login(updatedUser, token);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium"
        >
          Full Name
        </label>

        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your full name"
          required
          disabled={isSubmitting}
          className="w-full rounded-xl border border-divider bg-background px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="profile-email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="profile-email"
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full cursor-not-allowed rounded-xl border border-divider bg-default-100 px-4 py-3 text-default-500"
        />
      </div>

      <div>
        <label
          htmlFor="profile-photo"
          className="mb-2 block text-sm font-medium"
        >
          Profile Photo URL
        </label>

        <input
          id="profile-photo"
          type="url"
          value={photo}
          onChange={(event) => setPhoto(event.target.value)}
          placeholder="https://example.com/photo.jpg"
          disabled={isSubmitting}
          className="w-full rounded-xl border border-divider bg-background px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      {photo && (
        <div className="flex justify-center">
          <img
            src={photo}
            alt="Profile preview"
            className="h-24 w-24 rounded-full border border-divider object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
