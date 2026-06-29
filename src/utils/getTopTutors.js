export function getTopTutors(tutors, limit = 3) {
  if (!tutors || !Array.isArray(tutors)) return [];
  
  // Sorts copy of the array descending based on slots or highest fees
  return [...tutors]
    .sort((a, b) => (parseInt(b.totalSlot) || 0) - (parseInt(a.totalSlot) || 0))
    .slice(0, limit);
}
