import type { Metadata } from "next";
import { Inter, Roboto_Flex } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto-flex',
});

export const metadata: Metadata = {
  title: "AI Course 30",
  description: "Master AI in 30 Days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto_flex.variable}`}>
        {children}
      </body>
    </html>
  );
}
