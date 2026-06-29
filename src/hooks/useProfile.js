import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function useProfile() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

   // Fetch complete profile from backend database when session loads
  useEffect(() => {
    if (isSessionPending) return;

    const fetchProfile = async () => {
      // 1. Guard check safely inside the execution block
      if (!session?.user?.email) {
        setProfileData(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch profile records");
        }
        
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session, isSessionPending]);


  // Handle updating user profile data attributes
  const updateProfile = async (updatedFields) => {
    if (!session?.user?.email) return { success: false, error: "No active session found" };
    
    try {
      setIsUpdating(true);
      setError(null);
      
      const response = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, ...updatedFields }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile information");
      }

      const updatedData = await response.json();
      setProfileData(updatedData);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    user: session?.user || null,
    profileData,
    isLoading: isSessionPending || isLoading,
    isUpdating,
    error,
    updateProfile,
  };
}
