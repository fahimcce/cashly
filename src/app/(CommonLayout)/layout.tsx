import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CashLy app",
  description: "Secure Your Transaction",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children} <Toaster />
      </body>
    </html>
  );
}
