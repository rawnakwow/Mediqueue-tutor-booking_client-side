"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";

const SLIDES = [
  {
    badge: "Transforming Medical Education",
    titleLine: "Unlock Your Potential with Expert Tutors on",
    highlight: "MediQueue",
    description: "Connect with top-tier healthcare professionals and medical educators worldwide. Master health sciences, clinical practices, and biology on your own schedule."
  },
  {
    badge: "Interactive Real-Time Queueing",
    titleLine: "Skip Long Waiting Lines and Book Direct With",
    highlight: "Smart Slots",
    description: "Experience immediate appointment finalization. Our atomic reservation engine reduces scheduling overhead so you can jump straight into personalized learning rooms."
  },
  {
    badge: "Premium Professional Mentorship",
    titleLine: "Achieve Excellence Globally Under Certified",
    highlight: "Specialists",
    description: "Gain competitive academic advantages with verified educators from leading institutions. Explore tailored feedback channels curated entirely around your goals."
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32 border-b border-divider min-h-[500px] lg:min-h-[600px] flex flex-col justify-center">
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[80px]" />
      <div className="absolute top-12 right-1/4 -z-10 h-72 w-72 translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {SLIDES.map((slide, index) => {
          if (index !== currentSlide) return null;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center transition-all duration-700 ease-in-out animate-fade-in"
            >
            
              <div className="inline-flex items-center gap-2 rounded-full border border-divider bg-content2 px-3 py-1 text-xs font-medium text-foreground/80 mb-6 backdrop-blur-md">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {slide.badge}
              </div>

             
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl text-foreground balance">
                {slide.titleLine}{" "}
                <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent px-1">
                  {slide.highlight}
                </span>
              </h1>

             
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-default-500 max-w-2xl font-normal leading-relaxed min-h-[72px]">
                {slide.description}
              </p>
            </div>
          );
        })}

       
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/tutors"
            className={buttonVariants({
              variant: "solid",
              color: "primary",
              className: "h-11 px-6 font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all",
            })}
          >
            Find a Tutor
          </Link>
          
          <Link
            href="/courses"
            className={buttonVariants({
              variant: "bordered",
              color: "default",
              className: "h-11 px-6 font-medium text-sm hover:bg-content2 transition-colors",
            })}
          >
            Explore Courses
          </Link>
        </div>

       
        <div className="flex items-center gap-2.5 mt-12">
          {SLIDES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setCurrentSlide(dotIndex)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary/40 ${
                dotIndex === currentSlide 
                  ? "w-6 bg-primary" 
                  : "w-2 bg-divider hover:bg-default-400"
              }`}
              aria-label={`Navigate direct to slide section index frame number ${dotIndex + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
