export function SearchTutors(tutors, searchQuery) {
  if (!tutors || !Array.isArray(tutors)) return [];
  if (!searchQuery || typeof searchQuery !== "string") return tutors;
  
  const query = searchQuery.toLowerCase().trim();
  
  return tutors.filter((tutor) => 
    tutor?.name?.toLowerCase().includes(query) ||
    tutor?.subject?.toLowerCase().includes(query) ||
    tutor?.institution?.toLowerCase().includes(query) ||
    tutor?.location?.toLowerCase().includes(query)
  );
}
