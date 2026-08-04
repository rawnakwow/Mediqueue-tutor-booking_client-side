"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";

export default function ProfileCard() {
  const { user, token, login } = useAuth();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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

      /*
       * This updates AuthContext and localStorage.
       * Add a server PUT request here later when your server
       * provides a profile-update endpoint.
       */
      login(updatedUser, token);

      setIsEditing(false);
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

  const handleCancel = () => {
    setName(user?.name || "");
    setPhoto(user?.photo || user?.photoURL || "");
    setIsEditing(false);
  };

  const profilePhoto = photo || user?.photo || user?.photoURL || "";

  return (
    <section className="rounded-3xl border border-divider bg-content1 p-6 shadow-sm sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary text-3xl font-bold text-white">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={user?.name || "User profile"}
              className="h-full w-full object-cover"
            />
          ) : (
            user?.name?.charAt(0)?.toUpperCase() || "U"
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold">
          {user?.name || "User"}
        </h1>

        <p className="mt-1 text-sm text-default-500">
          {user?.email}
        </p>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-xl bg-primary font-semibold text-primary-foreground disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-11 rounded-xl border border-divider font-semibold disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground"
        >
          Edit Profile
        </button>
      )}
    </section>
  );
}