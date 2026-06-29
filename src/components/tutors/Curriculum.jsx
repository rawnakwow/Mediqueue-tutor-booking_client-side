"use client";

import { FaCheckCircle, FaGraduationCap, FaBookmark } from "react-icons/fa";

export function Curriculum({ subject }) {
  const modules = [
    { title: "Foundations & Core Principles", desc: "Introduction to basic paradigms, terminology, and structural frameworks." },
    { title: "Intermediate Applications", desc: "Hands-on projects, standard practices, and solving real-world case studies." },
    { title: "Advanced Optimizations & Review", desc: "Deep dive into performance bottlenecks, diagnostic tracking, and final assessments." }
  ];

  return (
    <div className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
        <FaGraduationCap className="text-primary text-xl" />
        Course Learning Roadmap: {subject || "General Track"}
      </h3>

      <div className="space-y-6">
        {modules.map((mod, index) => (
          <div key={index} className="flex gap-4 items-start group">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {index + 1}
            </div>
            
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-foreground tracking-tight">
                {mod.title}
              </h4>
              <p className="text-xs text-default-500 mt-1 leading-relaxed">
                {mod.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-divider/60 flex items-start gap-3 bg-content2/30 rounded-xl p-4 text-xs text-default-500">
        <FaBookmark className="text-violet-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-foreground">Session Requirement:</span> No advanced prior certification is required. Bring an internet-enabled workstation device and your active educational learning goals.
        </div>
      </div>
    </div>
  );
}
