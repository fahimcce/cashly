import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashLy app",
  description: "Secure Your Transaction",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
