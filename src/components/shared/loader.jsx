"use client";

// Named Export: Satisfies paths like: import { Loader } from "@/components/shared/loader"
export function Loader({ className = "w-8 h-8", text = "" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div className={`relative shrink-0 ${className}`}>
        {/* Animated outer spinning track border */}
        <div className="absolute inset-0 rounded-full border-2 border-divider" />
        {/* Active colored sweeping arc segment */}
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      
      {/* Optional helper context loading caption text */}
      {text && (
        <p className="text-xs font-medium text-default-400 animate-pulse tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}

// Default Export: Satisfies paths like: import Loader from "@/components/shared/loader"
export default Loader;
