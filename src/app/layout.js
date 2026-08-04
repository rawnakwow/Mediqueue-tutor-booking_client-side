import "./globals.css";

import Providers from "@/providers/Providers";

export const metadata = {
  title: {
    default: "MediQueue",
    template: "%s | MediQueue",
  },
  description: "Tutor discovery and booking platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}