import { useState, useEffect, useMemo } from "react";
import { getTopTutors } from "@/utils/getTopTutors";
import { SearchTutors } from "@/utils/SearchTutors";
import { toast } from "react-toastify";

export function useTutors(initialLimit = 0) {
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tutors data from backend API
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        // Appends limit parameter to route request if specified
        const url = initialLimit ? `/api/tutors?limit=${initialLimit}` : "/api/tutors";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch tutor listings data.");
        }

        const data = await response.json();
        setTutors(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Could not load tutors lists.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [initialLimit]);

  // Client-side search and filtering logic cached for performance
  const filteredTutors = useMemo(() => {
    return SearchTutors(tutors, searchQuery);
  }, [tutors, searchQuery]);

  // Utility to fetch top-performing tutors
  const getPopularTutors = (limit = 3) => {
    return getTopTutors(tutors, limit);
  };

  // Create a new tutor profile entry
  const createTutor = async (tutorData, token) => {
    try {
      const response = await fetch("/api/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorData),
      });

      if (!response.ok) throw new Error("Failed to add tutor.");
      
      const newTutor = await response.json();
      setTutors((prev) => [newTutor, ...prev]);
      toast.success("Tutor added successfully!");
      return { success: true, data: newTutor };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  // Delete a tutor profile entry
  const deleteTutor = async (id, token) => {
    try {
      const response = await fetch(`/api/tutors/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete profile.");

      setTutors((prev) => prev.filter((tutor) => tutor._id !== id));
      toast.success("Tutor listing removed successfully!");
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    tutors,
    filteredTutors,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    getPopularTutors,
    createTutor,
    deleteTutor,
  };
}
