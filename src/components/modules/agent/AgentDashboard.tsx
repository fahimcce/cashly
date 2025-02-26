"use client";
import React, { useState } from "react";
import {
  Wallet2,
  ArrowUpFromLine,
  Eye,
  EyeOff,
  Loader2,
  History,
  SendHorizontal,
  ArrowRightFromLine,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CashInInput, cashInSchema } from "@/lib/validations/transaction";
import { zodResolver } from "@hookform/resolvers/zod";

interface CashInFormData {
  userPhone: string;
  agentPhone: string;
  amount: number;
  password: string;
}

export default function AgentDashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with API data later
  const balance = 50000;
  const agentPhone = "01868229998";
  const accountStatus = "Active";
  const recentTransactions = [
    {
      id: 1,
      type: "Cash In",
      amount: 5000,
      userPhone: "01868299998",
      date: "2024-03-15",
    },
    {
      id: 2,
      type: "Cash In",
      amount: 3000,
      userPhone: "01868299999",
      date: "2024-03-14",
    },
    {
      id: 3,
      type: "Cash In",
      amount: 2000,
      userPhone: "01868299997",
      date: "2024-03-13",
    },
  ];

  const cashInForm = useForm<CashInInput>({
    resolver: zodResolver(cashInSchema),
    defaultValues: {
      userPhone: "01847546789",
      agentPhone: "",
      amount: 0,
      password: "",
    },
  });

  async function onCashIn(data: CashInInput) {
    setIsLoading(true);
    try {
      // This will be replaced with actual API call later
      console.log("Cash Out:", data);
      toast.success("Cash Out successfull");
      cashInForm.reset();
    } catch (error) {
      toast.error("Failed Cash Out!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wallet2 className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CashLy Agent
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Welcome to your CashLy Agent Portal
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Balance Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Balance</h3>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p
              className={`text-3xl font-bold ${!showBalance ? "blur-sm" : ""}`}
            >
              ৳{balance.toLocaleString()}
            </p>
          </div>

          {/* Cash In Form */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CashIn</CardTitle>
                  <ArrowRightFromLine className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Cash In to the user</CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>CashIn</DialogTitle>
                <DialogDescription>
                  CashIn to CashLy user. No fee will be charged.
                </DialogDescription>
              </DialogHeader>
              <Form {...cashInForm}>
                <form
                  onSubmit={cashInForm.handleSubmit(onCashIn)}
                  className="space-y-4"
                >
                  <FormField
                    control={cashInForm.control}
                    name="agentPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="01XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={cashInForm.control}
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
                    control={cashInForm.control}
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
                  <div className="text-sm text-muted-foreground">Fee: ৳ 0</div>
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

          {/* Account Status Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Account Status
            </h3>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  accountStatus === "Active" ? "bg-green-500" : "bg-red-500"
                } mr-2`}
              ></div>
              <p className="text-xl font-semibold">{accountStatus}</p>
            </div>
          </div>

          {/* Income */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Income</h3>
            <p className="text-xl font-semibold">5000</p>
          </div>
          {/* Agent ID Card */}
          {/* <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Agent ID
            </h3>
            <p className="text-xl font-semibold">{agentPhone}</p>
          </div> */}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Recent Transactions
            </h3>
            <History className="text-gray-500" size={20} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.type}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.userPhone}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      ৳{transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
