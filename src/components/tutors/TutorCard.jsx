"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@heroui/styles";
import { FaBookOpen, FaUserCircle, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

// Changed to a Named Export to align with your components
export function TutorCard({ tutor }) {
  const {
    _id,
    id,
    name,
    photo,
    subject,
    hourlyFee,
    totalSlot,
    sessionStartDate,
    institution,
  } = tutor || {};

  const tutorId = _id || id;
  
  // Clean readable date string formatting helper
  const formattedDate = sessionStartDate 
    ? new Date(sessionStartDate).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      })
    : "Flexible Start";

  const isFullyBooked = parseInt(totalSlot) <= 0;

  return (
    <div className="flex flex-col bg-content1 border border-divider rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-divider-hover transition-all group h-full justify-between">
      
      <div>
        {/* Decorative Top Banner */}
        <div className="h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-divider/40 relative" />

        {/* Profile Content */}
        <div className="px-6 pb-4 relative flex flex-col items-start -mt-10">
          {/* Avatar frame container */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-content1 bg-default-200 shadow-sm shrink-0 mb-3 relative">
            {photo ? (
              <Image
                src={photo}
                alt={name || "Tutor Profile"}
                width={64}
                height={64}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            ) : (
              <FaUserCircle className="w-full h-full text-default-400" />
            )}
          </div>

          {/* Subject Badge marker */}
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary mb-2">
            {subject || "General Education"}
          </span>

          {/* Title Branding Typography */}
          <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1 w-full">
            {name || "Anonymous Educator"}
          </h3>
          <p className="text-xs text-default-400 font-medium truncate w-full mt-0.5">
            {institution || "Independent Specialist"}
          </p>
        </div>

        {/* Quantitative Metrics Grid Column Layout */}
        <div className="grid grid-cols-2 gap-4 px-6 py-4 border-t border-b border-divider/50 bg-content2/30 text-xs text-default-500">
          <div className="flex items-center gap-2 min-w-0">
            <FaMoneyBillWave className="text-emerald-500 shrink-0 text-sm" />
            <span className="truncate font-medium">${hourlyFee || 0} / Hour</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <FaBookOpen className="text-blue-500 shrink-0 text-sm" />
            <span className={`truncate font-semibold ${isFullyBooked ? "text-danger" : "text-foreground"}`}>
              {isFullyBooked ? "Fully Booked" : `${totalSlot} Slots Left`}
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-0 col-span-2">
            <FaCalendarAlt className="text-violet-500 shrink-0 text-sm" />
            <span className="truncate">Starts: {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Profile Detail Action buttons anchor links */}
      <div className="p-4 bg-content2/10">
        <Link
          href={`/tutors/${tutorId}`}
          className={buttonVariants({
            variant: isFullyBooked ? "bordered" : "solid",
            color: isFullyBooked ? "default" : "primary",
            className: "w-full text-sm font-medium h-10 shadow-sm transition-all",
          })}
        >
          View Full Profile
        </Link>
      </div>

    </div>
  );
}
