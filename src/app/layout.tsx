import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Scrum - AI-Powered Project Management",
  description: "Automate workflows with autonomous Agent Swarms. AI-powered project management platform.",
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
