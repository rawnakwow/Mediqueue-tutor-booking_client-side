"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageTitle } from "@/components/shared/PageTitle";
import { Loader } from "@/components/shared/loader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AVAILABLE_SUBJECTS, TEACHING_MODES } from "@/utils/constants";

export default function AddTutorPage() {
  const { user, session, isPending: isAuthPending } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Route security layer validation guard
  useEffect(() => {
    if (isAuthPending) return;
    if (!user || !session) {
      toast.warning("Please login to create a tutor profile listing.");
      router.push("/signin");
    }
  }, [user, session, isAuthPending, router]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 1. Gather all input values instantly using native FormData mapping
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());

    // 2. Client-side field requirement validation check
    if (!payload.subject || !payload.hourlyFee || !payload.totalSlot || !payload.sessionStartDate) {
      toast.error("Please fill out all required tutor profile fields.");
      return;
    }

    try {
      setIsPending(true);

      // 3. Format structural types and inject authenticated user identities
      const formattedPayload = {
        ...payload,
        name: user?.name || payload.name || "Anonymous Educator",
        tutorEmail: user?.email, // Keep backend identity link protected
        hourlyFee: parseFloat(payload.hourlyFee),
        totalSlot: parseInt(payload.totalSlot),
        sessionStartDate: new Date(payload.sessionStartDate).toISOString(),
      };

      const response = await fetch("http://localhost:5000/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token || ""}`,
        },
        body: JSON.stringify(formattedPayload),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to save your tutor profile registry.");
      }

      toast.success("Tutor listing published successfully!");
      e.currentTarget.reset(); // Clear all form inputs
      router.refresh();
      router.push("/my-tutors"); // Redirect smoothly to dashboard panel

    } catch (err) {
      toast.error(err.message || "An unexpected error occurred while saving.");
    } finally {
      setIsPending(false);
    }
  };

  if (isAuthPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Authenticating component setup..." />
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 min-h-screen">
      <PageTitle 
        title="List a Tutoring Service" 
        subtitle="Fill out your credentials, schedule intervals, and pricing structures."
      />

      {/* Attach the custom submission method listener */}
      <form onSubmit={handleFormSubmit} className="bg-content1 border border-divider rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="p-4 bg-content2/40 rounded-2xl border border-divider/60 text-xs">
          <span className="font-semibold text-default-400 block mb-1">Authenticated Account Email:</span>
          <span className="text-foreground font-medium block">{user?.email}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Subject Select */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Teaching Subject Track</label>
            <select name="subject" className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm">
              {AVAILABLE_SUBJECTS.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Institution Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">University / Institution Affiliate</label>
            <input name="institution" type="text" placeholder="e.g., Stanford University" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>

          {/* Hourly Fee Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Hourly Rate Fee ($ USD)</label>
            <input name="hourlyFee" type="number" min="0" placeholder="e.g., 45" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>

          {/* Slots Depth Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Total Available Session Slots</label>
            <input name="totalSlot" type="number" min="1" placeholder="e.g., 5" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>

          {/* Session Start Date Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Session Batch Start Date</label>
            <input name="sessionStartDate" type="date" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm text-foreground" />
          </div>

          {/* Avatar Graphic URL Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Profile Photo Image URL</label>
            <input name="photo" type="url" placeholder="https://example.com" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>

          {/* Mode Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Teaching Mode Method</label>
            <select name="teachingMode" className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm">
              {TEACHING_MODES.map((mode, i) => (
                <option key={i} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          {/* Location Details Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Physical Location (City / State)</label>
            <input name="location" type="text" placeholder="e.g., Remote / New York, NY" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>

          {/* Days Tracker Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Available Days Selection</label>
            <input name="availableDays" type="text" placeholder="e.g., Mon, Wed, Fri" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>

          {/* Timeframe Window Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80">Time Slot Window Hours</label>
            <input name="timeSlot" type="text" placeholder="e.g., 04:00 PM - 06:00 PM" required className="w-full h-11 px-3 bg-content2 border border-divider rounded-xl text-sm" />
          </div>
        </div>

        {/* Text Area Description Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground/80">Professional Background & Experience Description</label>
          <textarea name="experience" rows="3" placeholder="Outline your background, certifications, and teaching paradigms..." required className="w-full p-3 bg-content2 border border-divider rounded-xl text-sm resize-none" />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? "Syncing database..." : "Publish Service Profile"}
        </button>

      </form>
    </div>
  );
}
