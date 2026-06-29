"use client";

import { useTutors } from "@/hooks/useTutors";
import {TutorCard}  from "@/components/tutors/TutorCard"; // Global reusable card
import Loader  from "@/components/shared/loader"; // Added curly braces

import Link from "next/link";

export default function FeaturedTutors() {
  // Use your built-in custom limit logic to fetch just the top 3 items
  const { tutors, isLoading, error } = useTutors(3);

  if (isLoading) return <div className="py-12 flex justify-center"><Loader /></div>;
  if (error) return null; // Fails silently on landing page layout if network drops

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Tutors</h2>
          <p className="text-default-500 mt-2">Learn from our top-rated educators globally.</p>
        </div>
        <Link 
          href="/tutors" 
          className="text-primary hover:underline text-sm font-medium transition-colors"
        >
          View All Tutors &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
