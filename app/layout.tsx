import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoleOffer - Startup Compensation Benchmarks",
  description: "Get accurate startup compensation data for your role, level, and location. Real benchmark data from $1M to $200M+ startups.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">
              <a href="/">RoleOffer</a>
            </h1>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-16 py-8 text-center text-gray-600">
          <p>© 2026 RoleOffer. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
