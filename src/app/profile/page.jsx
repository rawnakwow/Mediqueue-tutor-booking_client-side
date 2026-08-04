"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/shared/loader";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfilePage() {
  const router = useRouter();

  const {
    user,
    token,
    logout,
    isPending,
  } = useAuth();

  useEffect(() => {
    if (isPending) return;

    if (!user || !token) {
      toast.error("Please sign in to view your profile.");
      router.replace("/signin");
    }
  }, [user, token, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader
          className="h-12 w-12"
          text="Loading profile..."
        />
      </div>
    );
  }

  if (!user || !token) {
    return null;
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-10 sm:px-6">
      <ProfileCard />

      <button
        type="button"
        onClick={() => {
          logout();
          toast.success("Signed out successfully.");
          router.replace("/signin");
        }}
        className="mt-5 h-11 w-full rounded-xl border border-danger font-semibold text-danger transition hover:bg-danger/10"
      >
        Sign Out
      </button>
    </main>
  );
}