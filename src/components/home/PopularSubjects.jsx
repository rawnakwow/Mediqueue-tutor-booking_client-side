"use client";

import { useTutors } from "@/hooks/useTutors";
import { FaCode, FaHeartbeat, FaLanguage, FaCalculator, FaPaintBrush, FaBriefcase } from "react-icons/fa";

const SUBJECTS = [
  { name: "Computer Science", icon: FaCode, color: "bg-blue-500/10 text-blue-500", count: "120+ Tutors" },
  { name: "Health & Medicine", icon: FaHeartbeat, color: "bg-emerald-500/10 text-emerald-500", count: "85+ Tutors" },
  { name: "Languages", icon: FaLanguage, color: "bg-violet-500/10 text-violet-500", count: "210+ Tutors" },
  { name: "Mathematics", icon: FaCalculator, color: "bg-amber-500/10 text-amber-500", count: "95+ Tutors" },
  { name: "Art & Design", icon: FaPaintBrush, color: "bg-rose-500/10 text-rose-500", count: "60+ Tutors" },
  { name: "Business & Marketing", icon: FaBriefcase, color: "bg-pink-500/10 text-pink-500", count: "110+ Tutors" },
];

export default function PopularSubjects() {
  const { setSearchQuery } = useTutors();

  const handleSubjectClick = (subjectName) => {
    setSearchQuery(subjectName);
  };

  return (
    <section className="py-16 bg-content1/50 border-y border-divider">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Popular Subjects</h2>
          <p className="text-default-500 mt-2">
            Explore trending fields and book interactive interactive sessions with certified professionals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SUBJECTS.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <div
                key={index}
                onClick={() => handleSubjectClick(subject.name)}
                role="button"
                tabIndex={0}
                className="flex flex-col items-center p-6 bg-background border border-divider rounded-2xl hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className={`p-4 rounded-xl ${subject.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mt-4 text-center truncate w-full">
                  {subject.name}
                </h3>
                <p className="text-xs text-default-400 mt-1">
                  {subject.count}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
