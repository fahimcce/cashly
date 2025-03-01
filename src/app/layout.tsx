import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "CashLy",
  description: "CashLy Mobile Financial Service (MFS) application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
