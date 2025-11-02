import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treetino",
  description: "The future of enrgy, rooted in sustainability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}