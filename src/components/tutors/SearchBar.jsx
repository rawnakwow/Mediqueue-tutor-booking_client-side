"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

export function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="relative flex items-center group">
        {/* Search Icon Anchor */}
        <div className="absolute left-4 text-default-400 group-focus-within:text-primary transition-colors pointer-events-none">
          <FaSearch className="text-sm" />
        </div>

        {/* Input Element */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search tutors by name, teaching subject, or university institution..."
          className="w-full h-12 pl-11 pr-11 bg-content1 border border-divider rounded-2xl text-sm font-normal text-foreground placeholder:text-default-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        />

        {/* Clear Search helper button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 text-default-400 hover:text-foreground transition-colors p-1 rounded-full hover:bg-content2 focus:outline-none"
            aria-label="Clear search query"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </div>
    </div>
  );
}
