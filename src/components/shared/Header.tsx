"use client";

import React from "react";
import { Wallet2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/FindUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed !!");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Wallet2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CashLy
              </h1>
            </a>
          </div>

          {user ? (
            <button
              className="text-red-600 cursor-pointer px-2 py-2 rounded-lg hover:text-white hover:bg-red-700 transition-colors font-medium border"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
