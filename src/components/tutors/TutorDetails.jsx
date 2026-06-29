"use client";

import Image from "next/image";
import { Curriculum } from "./Curriculum";
import { 
  FaUserCircle, 
  FaUniversity, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaLaptopHouse, 
  FaMoneyBillWave, 
  FaClock 
} from "react-icons/fa";

export function TutorDetails({ tutor, children }) {
  // Graceful handling of empty or missing props
  const {
    name,
    photo,
    subject,
    hourlyFee,
    totalSlot,
    sessionStartDate,
    institution,
    experience,
    location,
    teachingMode,
    availableDays,
    timeSlot
  } = tutor || {};

  const isFullyBooked = parseInt(totalSlot) <= 0;
  const formattedDate = sessionStartDate
    ? new Date(sessionStartDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Flexible Start";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: Main Profile Identity & Information Card */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Profile Card Header wrapper */}
        <div className="bg-content1 border border-divider rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
          {/* Top Corner Identity Watermark Background Accent */}
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />

          {/* Large Avatar container */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-default-200 border border-divider shrink-0 relative">
            {photo ? (
              <Image
                src={photo}
                alt={name || "Tutor Profile"}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <FaUserCircle className="w-full h-full text-default-400" />
            )}
          </div>

          {/* Identity Meta text block */}
          <div className="text-center sm:text-left min-w-0 flex-1">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary mb-3">
              {subject || "General Track"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight truncate">
              {name || "Anonymous Educator"}
            </h1>
            
            {/* Institution Badge block */}
            <p className="text-default-500 font-medium text-sm mt-1.5 flex items-center justify-center sm:justify-start gap-2">
              <FaUniversity className="text-primary shrink-0" />
              <span className="truncate">{institution || "Independent Specialist"}</span>
            </p>

            {/* Experience Stats Row */}
            <p className="text-default-400 text-xs mt-1 flex items-center justify-center sm:justify-start gap-2">
              <FaBriefcase className="shrink-0" />
              <span>{experience || "No specific background info listed"}</span>
            </p>
          </div>
        </div>

        {/* Operational Context Specs Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-content1 border border-divider rounded-2xl p-6 shadow-sm text-sm">
          <div className="flex items-center gap-3 text-default-500 min-w-0">
            <div className="p-2.5 rounded-xl bg-content2 text-foreground"><FaMapMarkerAlt /></div>
            <div className="truncate"><span className="font-semibold text-foreground block text-xs">Location</span>{location || "Remote"}</div>
          </div>
          <div className="flex items-center gap-3 text-default-500 min-w-0">
            <div className="p-2.5 rounded-xl bg-content2 text-foreground"><FaLaptopHouse /></div>
            <div className="truncate"><span className="font-semibold text-foreground block text-xs">Method</span>{teachingMode || "Online"}</div>
          </div>
          <div className="flex items-center gap-3 text-default-500 min-w-0">
            <div className="p-2.5 rounded-xl bg-content2 text-foreground"><FaClock /></div>
            <div className="truncate"><span className="font-semibold text-foreground block text-xs">Availability</span>{availableDays || "Flexible Hours"}</div>
          </div>
          <div className="flex items-center gap-3 text-default-500 min-w-0">
            <div className="p-2.5 rounded-xl bg-content2 text-foreground"><FaMoneyBillWave /></div>
            <div className="truncate"><span className="font-semibold text-foreground block text-xs">Hourly Fee</span>${hourlyFee || 0} USD</div>
          </div>
        </div>

        {/* Embedded Syllabus List Curriculum Wrapper */}
        <Curriculum subject={subject} />
      </div>

      {/* RIGHT COLUMN: Interactive Booking Sidebar Area */}
      <div className="space-y-6">
        <div className="bg-content1 border border-divider rounded-3xl p-6 shadow-sm sticky top-24">
          <h2 className="text-lg font-bold text-foreground mb-4 tracking-tight">Reserve a Session Slot</h2>
          
          {/* Quick Metrics Badge List */}
          <div className="space-y-3 mb-6 p-4 bg-content2/40 rounded-xl text-xs text-default-500">
            <div className="flex justify-between items-center">
              <span>Hourly Cost:</span>
              <span className="font-bold text-foreground text-sm">${hourlyFee || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Time Slot Window:</span>
              <span className="font-medium text-foreground">{timeSlot || "Arranged"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Session Starts:</span>
              <span className="font-medium text-foreground">{formattedDate}</span>
            </div>
            <div className="h-px bg-divider/60 my-2" />
            <div className="flex justify-between items-center">
              <span>Status:</span>
              <span className={`font-bold ${isFullyBooked ? "text-danger" : "text-emerald-500"}`}>
                {isFullyBooked ? "Fully Booked" : `${totalSlot} Available Slots`}
              </span>
            </div>
          </div>

          {/* Child Inject point for embedding BookingForm.jsx or fallback alerts */}
          {children}
        </div>
      </div>

    </div>
  );
}
