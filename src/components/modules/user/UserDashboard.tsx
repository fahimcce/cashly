"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Wallet,
  SendHorizontal,
  ArrowUpFromLine,
  Eye,
  EyeOff,
  Loader2,
  Wallet2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendMoneySchema, cashOutSchema } from "@/lib/validations/transaction";
import type {
  SendMoneyInput,
  CashOutInput,
} from "@/lib/validations/transaction";
import { toast } from "sonner";

export default function UserDashboardPage() {
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with API data later
  const balance = 5000;
  const userPhone = "01868189998"; // This will come from auth context later

  const sendMoneyForm = useForm<SendMoneyInput>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      senderPhone: userPhone,
      receiverPhone: "",
      amount: 0,
    },
  });

  const cashOutForm = useForm<CashOutInput>({
    resolver: zodResolver(cashOutSchema),
    defaultValues: {
      userPhone: userPhone,
      agentPhone: "",
      amount: 0,
      password: "",
    },
  });

  async function onSendMoney(data: SendMoneyInput) {
    setIsLoading(true);
    try {
      // This will be replaced with actual API call later
      console.log("Send Money:", data);
      toast.success("successfull send money");
      sendMoneyForm.reset({ senderPhone: userPhone });
    } catch (error) {
      toast.error("Failed send money");
    } finally {
      setIsLoading(false);
    }
  }

  async function onCashOut(data: CashOutInput) {
    setIsLoading(true);
    try {
      // This will be replaced with actual API call later
      console.log("Cash Out:", data);
      toast.success("Cash Out successfull");
      cashOutForm.reset({ userPhone: userPhone });
    } catch (error) {
      toast.error("Failed Cash Out!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Wallet2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CashLy user
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your Trusted Mobile Financial Service Partner
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div
                className={`text-2xl font-bold ${
                  !showBalance ? "blur-sm" : ""
                }`}
                onClick={() => setShowBalance(!showBalance)}
              >
                ৳{balance.toLocaleString()}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Send Money Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-accent transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Send Money
                </CardTitle>
                <SendHorizontal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transfer money to another user
                </CardDescription>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Money</DialogTitle>
              <DialogDescription>
                Send money to another CashLy user. Minimum amount is ৳50.
              </DialogDescription>
            </DialogHeader>
            <Form {...sendMoneyForm}>
              <form
                onSubmit={sendMoneyForm.handleSubmit(onSendMoney)}
                className="space-y-4"
              >
                <FormField
                  control={sendMoneyForm.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={sendMoneyForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (৳)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-sm text-muted-foreground">
                  Fee: ৳5 (for amounts over ৳100)
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Send Money"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Cash Out Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-accent transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cash Out</CardTitle>
                <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Withdraw cash from an agent</CardDescription>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cash Out</DialogTitle>
              <DialogDescription>
                Withdraw cash from a CashLy agent. A 1.5% fee will be charged.
              </DialogDescription>
            </DialogHeader>
            <Form {...cashOutForm}>
              <form
                onSubmit={cashOutForm.handleSubmit(onCashOut)}
                className="space-y-4"
              >
                <FormField
                  control={cashOutForm.control}
                  name="agentPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={cashOutForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (৳)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={cashOutForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-sm text-muted-foreground">
                  Fee: ৳
                  {(Number(cashOutForm.watch("amount")) * 0.015).toFixed(2)}{" "}
                  (1.5%)
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Cash Out"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
