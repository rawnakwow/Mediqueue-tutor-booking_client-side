// Inside src/app/layout.js
import { CombinedProviders } from "@/context/Combinedproviders.js";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CombinedProviders>
          <Navbar />
          <main className="min-h-screen flex flex-col">{children}</main>
          <Footer />
        </CombinedProviders>
      </body>
    </html>
  );
}
