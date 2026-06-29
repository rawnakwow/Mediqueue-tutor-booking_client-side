"use client";

import { useTutors } from "@/hooks/useTutors";
import { SearchBar } from "@/components/tutors/SearchBar";
import { TutorCard } from "@/components/tutors/TutorCard";
import { PageTitle } from "@/components/shared/PageTitle";
import { Loader } from "@/components/shared/loader";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export default function TutorsCatalogPage() {
  const { 
    filteredTutors, 
    searchQuery, 
    setSearchQuery, 
    isLoading, 
    error 
  } = useTutors();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      <PageTitle 
        title="Find Professional Tutors" 
        subtitle="Browse through our catalog of verified expert educators and book a real-time session slot today."
        centered
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {isLoading ? (
        <Loader text="Loading available tutor listings..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filteredTutors.length === 0 ? (
        <EmptyState 
          title="No Tutors Found" 
          message={`We couldn't find any results matching "${searchQuery}". Try updating your search keyword terms.`}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
