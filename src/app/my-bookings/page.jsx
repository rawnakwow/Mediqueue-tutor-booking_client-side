"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageTitle } from "@/components/shared/PageTitle";
import { MyBookingsTable } from "@/components/dashboard/MyBookingsTable";
import { Loader } from "@/components/shared/loader";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useRouter } from "next/navigation";

export default function MyBookingsDashboardPage() {
  const { user, session, isPending: isAuthPending } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  
  const fetchMyBookedSessions = useCallback(async () => {
    if (!user || !user.email) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings?email=${encodeURIComponent(user.email)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.token || ""}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to load your booked sessions data rows from the database.");
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.email, session?.token]);




  useEffect(() => {
    if (isAuthPending) return;

    if (!user || !session) {
      router.push("/signin");
      return;
    }

    const loadBookings = async () => {
      await fetchMyBookedSessions();
    };

    loadBookings();
  }, [user, session, isAuthPending, router, fetchMyBookedSessions]);



  
  if (isAuthPending || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader text="Syncing your interactive learning timetables..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]">
        <ErrorMessage message={error} onRetry={fetchMyBookedSessions} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      
      <PageTitle 
        title="My Booked Sessions" 
        subtitle="Track your reserved schedules, monitor tutor credentials, and adjust active session plans."
      />

      
      {bookings.length === 0 ? (
        <EmptyState 
          title="No Bookings Reserved"
          message="You haven't scheduled any interactive tutoring sessions on the platform dashboard workspace yet."
          actionLabel="Browse Available Tutors"
          actionUrl="/tutors"
        />
      ) : (
        <div className="mt-6 animate-fade-in">
          <MyBookingsTable bookings={bookings} onRefresh={fetchMyBookedSessions} />
        </div>
      )}
    </div>
  );
}
