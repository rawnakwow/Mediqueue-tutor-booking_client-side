"use client";

import { FaExclamationTriangle } from "react-icons/fa";

// Named Export: handles 'import { ErrorMessage } from ...'
export function ErrorMessage({ 
  message = "An unexpected error occurred while loading this section.", 
  onRetry = null 
}) {
  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-danger/10 border border-danger/20 rounded-2xl flex flex-col items-center text-center gap-4 shadow-sm animate-fade-in">
      {/* Warning Icon Badge Container */}
      <div className="w-12 h-12 rounded-full bg-danger/20 text-danger flex items-center justify-center shrink-0">
        <FaExclamationTriangle className="text-xl" />
      </div>

      {/* Error Message Copy */}
      <div className="space-y-1">
        <h4 className="font-bold text-sm text-foreground tracking-tight">
          System Notice
        </h4>
        <p className="text-xs text-default-500 leading-relaxed font-normal balance max-w-[280px]">
          {message}
        </p>
      </div>

      {/* Optional Interactive Action Callback Button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 h-8 px-4 text-xs font-semibold bg-background border border-divider hover:border-danger-hover hover:bg-danger/5 text-foreground rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-danger/20"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Default Export: handles 'import ErrorMessage from ...'
export default ErrorMessage;
