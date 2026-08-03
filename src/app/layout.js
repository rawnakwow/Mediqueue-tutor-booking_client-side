// src/app/layout.js
import Providers from "@/providers/Providers";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar /> 
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}