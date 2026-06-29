"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/loader";

export default function BookingForm({ tutorId, totalSlot, hourlyFee }) {
  const { user, session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isFullyBooked = parseInt(totalSlot) <= 0;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Guard Check 1: User authentication status validation
    if (!user || !session) {
      toast.warning("Please sign in to book a session slot.");
      router.push("/signin");
      return;
    }

    // Guard Check 2: Real-time slot availability validation
    if (isFullyBooked) {
      toast.error("Booking failed! There are no available slots left.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Structure data row to match MongoDB schema constraints perfectly
      const bookingPayload = {
        tutorId,
        studentEmail: user.email,
        studentName: user.name,
        bookedAt: new Date().toISOString(),
        feePaid: hourlyFee,
        status: "active"
      };

      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Pass JWT token securely inside authorization headers
          Authorization: `Bearer ${session.token || ""}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong while booking.");
      }

      toast.success("Session slot reserved successfully!", { autoClose: 3000 });
      
      // Refresh the page layout to decrement slots instantly on the screen
      router.refresh();
      
      // Redirect student to review their updated schedules dashboard page
      router.push("/my-bookings");

    } catch (err) {
      toast.error(err.message || "Failed to finalize booking reservation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleBookingSubmit} className="space-y-4">
      {/* Read-only tracking parameter fields to clarify user context */}
      {user && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-default-400 block">
            Booking As:
          </label>
          <div className="p-3 bg-content2/50 rounded-xl border border-divider text-xs text-foreground/80 truncate">
            {user.email}
          </div>
        </div>
      )}

      {/* Conditional submission trigger logic block */}
      {isFullyBooked ? (
        <button
          type="button"
          disabled
          className="w-full h-11 rounded-xl bg-default-200 text-default-400 font-semibold text-sm cursor-not-allowed border border-divider"
        >
          Registration Closed
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 text-current" /> Processing...
            </>
          ) : (
            "Confirm Reservation"
          )}
        </button>
      )}
    </form>
  );
}
