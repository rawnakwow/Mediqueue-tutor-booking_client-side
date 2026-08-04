import "./globals.css";

import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
       <Navbar /> 
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}