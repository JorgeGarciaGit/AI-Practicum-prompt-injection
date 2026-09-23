import type { Metadata } from "next";
import "./globals.css";
import DemoShell from "@/components/DemoShell";

export const metadata: Metadata = {
  title: "Prompt Injection Lab",
  description: "Interactive prompt injection demonstration"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DemoShell>{children}</DemoShell>
      </body>
    </html>
  );
}