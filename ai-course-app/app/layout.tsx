import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Introduction to AI Course",
  description: "30-day AI onboarding course dashboard and modules",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-light text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
