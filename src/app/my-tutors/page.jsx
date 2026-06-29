"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageTitle } from "@/components/shared/PageTitle";
import { MyTutorsTable } from "@/components/dashboard/MyTutorsTable";
import { Loader } from "@/components/shared/loader";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useRouter } from "next/navigation";

export default function MyTutorsDashboardPage() {
  const { user, session, isPending: isAuthPending } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 1. Fetch profiles belonging to the logged-in educator instance
  const fetchMyTutorProfiles = useCallback(async () => {
    if (!user?.email) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Query parameters pass user email to fetch creator-isolated tables
      const response = await fetch(`http://localhost:5000/tutors?email=${encodeURIComponent(user.email)}`);

      if (!response.ok) {
        throw new Error("Failed to load your active tutor listings from database.");
      }

      const data = await response.json();
      
      // Filter records safely in the client to ensure rigorous isolation protection
      const recordsCreatedByMe = data.filter((tutor) => tutor.tutorEmail === user.email);
      setTutors(recordsCreatedByMe);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.email]);

  // 2. Authentication Access Guard Protection Layer
  useEffect(() => {
    if (isAuthPending) return;

    if (!user || !session) {
      router.push("/signin");
    } else {
      fetchMyTutorProfiles();
    }
  }, [user, session, isAuthPending, router, fetchMyTutorProfiles]);

  // 3. Conditional Layout Pipeline Management States
  if (isAuthPending || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader text="Syncing your active teaching profiles dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]">
        <ErrorMessage message={error} onRetry={fetchMyTutorProfiles} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      {/* Structural Context Titles */}
      <PageTitle 
        title="Manage My Tutor Profiles" 
        subtitle="Track your published tracks, adjust hourly pricing matrices, and monitor available booking slot depths."
      />

      {/* 4. Alternate rendering depending on data matrix presence */}
      {tutors.length === 0 ? (
        <EmptyState 
          title="No Tutor Profiles Active"
          message="You haven't added any tutoring services to the platform database workspace registry yet."
          actionLabel="List a Service"
          actionUrl="/add-tutor"
        />
      ) : (
        <div className="mt-6 animate-fade-in">
          <MyTutorsTable tutors={tutors} onRefresh={fetchMyTutorProfiles} />
        </div>
      )}
    </div>
  );
}
