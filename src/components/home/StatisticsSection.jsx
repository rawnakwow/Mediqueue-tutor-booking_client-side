"use client";

import { useTutors } from "@/hooks/useTutors";
// CHANGED: FaUserGraduation -> FaUserGraduate
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaClock } from "react-icons/fa";

export default function StatisticsSection() {
  const { tutors, isLoading } = useTutors();
  const activeTutorsCount = isLoading ? "..." : tutors.length;

  const STATS_ITEMS = [
    {
      label: "Active Tutors",
      value: activeTutorsCount,
      icon: FaChalkboardTeacher,
      color: "text-violet-500 bg-violet-500/10",
    },
    {
      label: "Happy Students",
      value: "4,500+",
      icon: FaUserGraduate, // CHANGED: Updated here as well
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Lessons Booked",
      value: "12,800+",
      icon: FaBookOpen,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "Teaching Hours",
      value: "25,000+",
      icon: FaClock,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <section className="py-12 bg-background border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-content1 border border-divider rounded-2xl shadow-sm hover:shadow-md hover:border-divider-hover transition-all"
              >
                <div className={`p-4 rounded-xl shrink-0 ${item.color}`}>
                  <IconComponent className="text-xl sm:text-2xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground truncate">
                    {item.value}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-default-500 mt-0.5 truncate">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
