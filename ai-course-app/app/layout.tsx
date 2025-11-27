import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/SessionProvider";
import BugReportModal from "@/components/BugReportModal";

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
        <AuthSessionProvider>
          {children}
          <BugReportModal />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
