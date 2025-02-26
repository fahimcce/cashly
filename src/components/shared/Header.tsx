import React from "react";
import { Wallet2 } from "lucide-react";
import Link from "next/link";

export default function Header() {
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

          {/* Login Button */}
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
