import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandeep Kumar — AI/ML Engineer",
  description:
    "Portfolio of Sandeep Kumar, an AI/ML engineer focused on building AI agents and production-grade AI systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
