"use client";

import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    role: "Computer Science Student",
    review: "The tutoring sessions here completely changed my academic path. My programming tutor explains complex data structures with incredible patience and clarity.",
    rating: 5,
    image: "https://unsplash.com",
  },
  {
    name: "Alex Rivera",
    role: "Language Learner",
    review: "I needed to improve my conversational Spanish for work quickly. Within two months of interactive scheduling, I successfully passed my foreign language proficiency exam!",
    rating: 5,
    image: "https://unsplash.com",
  },
  {
    name: "Emily Chen",
    role: "Pre-Med Undergraduate",
    review: "Finding specialized biochemistry mentorship was so difficult elsewhere. The tutors on this platform are highly credentialed, and scheduling slots is effortless.",
    rating: 5,
    image: "https://unsplash.com",
  },
];

export default function StudentReviews() {
  return (
    <section className="py-16 bg-content1/30 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">What Our Students Say</h2>
          <p className="text-default-500 mt-2">
            Read authentic reviews from learners who successfully achieved their educational goals.
          </p>
        </div>

        {/* Testimonials Responsive Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((item, index) => (
            <div
              key={index}
              className="relative p-6 bg-background border border-divider rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Decorative Quote Icon Accent */}
              <div className="absolute top-4 right-4 text-default-200/50 group-hover:text-primary/10 text-3xl transition-colors pointer-events-none">
                <FaQuoteLeft />
              </div>

              <div>
                {/* Dynamic Star Ratings Array Maker */}
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>

                {/* Main Review Quote Text */}
                <p className="text-foreground/80 text-sm leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Reviewer Meta Avatar Info Profile Block */}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-divider/50">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-default-200 shrink-0 border border-divider">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-default-400 truncate">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
