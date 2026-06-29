"use client";

import { useState, useEffect, use } from "react";
import { TutorDetails } from "@/components/tutors/TutorDetails";
import BookingForm from "@/components/auth/BookingForm";
import { Loader } from "@/components/shared/loader";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export default function SingleTutorProfilePage({ params: paramsPromise }) {
  // 1. Unwrap the dynamic route parameters safely using React.use()
  const params = use(paramsPromise);
  const tutorId = params?.id;

  const [tutor, setTutor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch specific data rows from Express MongoDB backend endpoints
  useEffect(() => {
    if (!tutorId) return;

    const fetchSingleTutor = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/tutors/${tutorId}`);

        if (!response.ok) {
          throw new Error("Tutor profile could not be found or has been removed.");
        }

        const data = await response.json();
        setTutor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleTutor();
  }, [tutorId]);

  // 3. Conditional state checks to keep pipeline layouts clean
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Retrieving real-time educator credentials..." />
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorMessage message={error || "Profile data missing."} />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-12">
      {/* 
        4. Pass tutor attributes straight to the layouts.
        Children nodes embed inside the sidebar container inject point.
      */}
      <TutorDetails tutor={tutor}>
        <BookingForm 
          tutorId={tutor._id || tutor.id} 
          totalSlot={tutor.totalSlot} 
          hourlyFee={tutor.hourlyFee} 
        />
      </TutorDetails>
    </div>
  );
}
