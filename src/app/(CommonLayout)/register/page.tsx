import { Wallet2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import RegisterForm from "@/components/modules/register/registerForm";

export default function RegisterPage() {
  return (
    <div className="container max-w-lg mx-auto p-4">
      <Card className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <Wallet2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">CashLy</h1>
          </div>
          <h2 className="text-xl font-semibold">Create your account</h2>
          <p className="text-sm text-muted-foreground">
            Enter your details to register for a new account
          </p>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <RegisterForm />
        </Suspense>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
