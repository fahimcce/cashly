"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  user: any | null;
  token: string | null;
  logOut: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userFromCookies = Cookies.get("user")
      ? JSON.parse(Cookies.get("user") as string)
      : null;
    setUserState(userFromCookies);
  }, []);

  const logOut = () => {
    setUserState(null);
    setToken(null);
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
