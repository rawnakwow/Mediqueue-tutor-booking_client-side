"use client";

import { FaInbox } from "react-icons/fa";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";

// Named Export: handles 'import { EmptyState } from ...'
export function EmptyState({ 
  title = "No items found", 
  message = "There are no records available in this section at the moment.", 
  actionLabel = "", 
  actionUrl = "" 
}) {
  return (
    <div className="w-full max-w-md mx-auto my-12 p-8 bg-content1 border border-divider rounded-3xl flex flex-col items-center text-center gap-5 shadow-sm animate-fade-in">
      {/* Visual Empty Container Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-default-100 border border-divider text-default-400 flex items-center justify-center shrink-0 shadow-inner">
        <FaInbox className="text-2xl" />
      </div>

      {/* Primary Context Copy */}
      <div className="space-y-1.5">
        <h3 className="font-bold text-lg text-foreground tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-default-500 leading-relaxed font-normal max-w-[300px] mx-auto balance">
          {message}
        </p>
      </div>

      {/* Optional Call-to-Action Redirect Button */}
      {actionLabel && actionUrl && (
        <Link
          href={actionUrl}
          className={buttonVariants({
            variant: "solid",
            color: "primary",
            className: "h-9 px-5 font-medium text-xs shadow-sm mt-2 transition-all",
          })}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

// Default Export: handles 'import EmptyState from ...'
export default EmptyState;
