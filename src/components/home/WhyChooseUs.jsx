"use client";

import { FaShieldAlt, FaClock, FaCheckCircle, FaAward } from "react-icons/fa";

const BENEFITS = [
  {
    title: "Verified Top Tutors",
    description: "Every educator on our platform goes through a strict identity, credential, and background verification process.",
    icon: FaShieldAlt,
    color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Flexible Scheduling",
    description: "Book real-time interactive training slots that fit cleanly around your existing work or school calendar constraints.",
    icon: FaClock,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Instant Booking Logic",
    description: "No long waiting queues or approval delays. Pick your favorite available slot and finalize your session instantly.",
    icon: FaCheckCircle,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Premium Education Quality",
    description: "Gain access to elite materials, tailored feedback channels, and certified experts focused on your success.",
    icon: FaAward,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-background border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading Group */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Our Platform</h2>
          <p className="text-default-500 mt-2">
            We prioritize quality education, reliable session tracking, and seamless slot management for global learners.
          </p>
        </div>

        {/* Feature Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 bg-content1 border border-divider rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                {/* Visual Icon Header Block */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-xl" />
                </div>

                {/* Text Content Block */}
                <h3 className="font-bold text-lg text-foreground mt-5 tracking-tight">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-default-500 mt-2 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
