"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet2, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { toast } from "sonner";
import { login } from "@/services/AuthServices";
import Cookies from "js-cookie";
import { verifiyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
// import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      const response = await login(data);

      toast.success("Logged in successfully!");

      const { accessToken, refreshToken } = response;
      Cookies.set("accessToken", accessToken, { path: "/", secure: false });
      Cookies.set("refreshToken", refreshToken, { path: "/", secure: false });

      const user = verifiyToken(accessToken);
      Cookies.set(
        "user",
        JSON.stringify({
          identifier: user?.identifier,
          role: user?.role,
        })
      );

      if (user.role == "user") {
        // router.push("/user");
        window.location.href = "/user";
      }
      if (user.role == "agent") {
        // router.push("/agent");
        window.location.href = "/agent";
      }
      if (user.role == "admin") {
        // router.push("/agent");
        window.location.href = "/admin";
      }
    } catch {
      toast.error("login failed !!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-lg mx-auto p-4">
      <Card className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <Wallet2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">CashLy</h1>
          </div>
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            Sign in to your account using your phone number or email
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01XXXXXXXXX or example@email.com"
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        <div className="space-y-2 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
