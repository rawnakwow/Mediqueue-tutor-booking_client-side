import "./globals.css";

import Providers from "@/providers/Providers";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: {
    default: "MediQueue",
    template: "%s | MediQueue",
  },
  description:
    "Discover qualified tutors and book learning sessions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar/>

            <main className="flex-1">
              {children}
            </main>

            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  );
}