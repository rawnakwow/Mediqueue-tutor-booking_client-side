"use client";

import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { PageTitle } from "@/components/shared/PageTitle";
import { Loader } from "@/components/shared/loader";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { UpdateProfileForm } from "@/components/profile/UpdateProfileForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, session, isLoading, updateProfile } = useProfile();
  const router = useRouter();

  // 1. Enforce strict authentication route guard isolation protection
  useEffect(() => {
    if (isLoading) return;
    
    if (!user || !session) {
      toast.warning("Please sign in to view your profile panel.");
      router.push("/signin");
    }
  }, [user, session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader text="Syncing your account credentials..." />
      </div>
    );
  }

  // Fallback check to prevent rendering empty elements if redirection lags
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      {/* Structural Context Titles */}
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* LEFT COLUMN: Visual Profile Presentational Display Card */}
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
        </div>

        {/* RIGHT COLUMN: Interactive Form Modification Inputs */}
        <div className="lg:col-span-2">
          <UpdateProfileForm user={user} onUpdate={updateProfile} />
        </div>
      </div>
    </div>
  );
}
