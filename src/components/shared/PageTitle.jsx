"use client";

// Named Export: handles 'import { PageTitle } from ...'
export function PageTitle({ 
  title, 
  subtitle = "", 
  centered = false 
}) {
  return (
    <div className={`mb-8 space-y-2 ${centered ? "text-center" : "text-left"}`}>
      {/* Primary Section Header Heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight sm:leading-none">
        {title}
      </h1>
      
      {/* Optional Description Subtext Paragraph */}
      {subtitle && (
        <p className="text-sm font-normal text-default-500 max-w-2xl balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Default Export: handles 'import PageTitle from ...'
export default PageTitle;
