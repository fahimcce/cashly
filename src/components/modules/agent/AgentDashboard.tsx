"use client";
import React, { useEffect, useState } from "react";
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
import {
  BalanceInquiry,
  cashIn,
  get100Transaction,
} from "@/services/TransactionServices";
import { TMe, TTransaction } from "@/types";
import { getMe } from "@/services/AuthServices";

export default function AgentDashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [myData, setMyData] = useState<TMe | null>(null);

  const [transactions, setTransactions] = useState<TTransaction[]>([]);

  //balance
  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const data = await BalanceInquiry();
        console.log("data:", data);
        setBalance(data.balance || 0); // Update the state
      } catch (err) {
        console.error("Failed to fetch balance");
      }
    };
    fetchBalances();
  }, []);

  //my data
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getMe();
      setMyData(data);
      setIsLoading(false);
    })();
  }, []);

  //get transactions
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await get100Transaction();
      setTransactions(data);
      setIsLoading(false);
    })();
  }, []);

  const cashInForm = useForm<CashInInput>({
    resolver: zodResolver(cashInSchema),
    defaultValues: {
      userPhone: "",
      amount: 0,
      password: "",
    },
  });

  async function onCashIn(data: CashInInput) {
    setIsLoading(true);
    try {
      await cashIn(data);

      toast.success("Cash In successfull");
      cashInForm.reset();
      window.location.href = "/agent";
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
              ৳ {balance}
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
                    name="userPhone"
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

          {/* Account Approval */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Account Approval
            </h3>
            <div className="flex items-center">
              {myData?.isApproved === false ? (
                <p className="text-red-500">Not Approved Yet</p>
              ) : (
                <p className="text-green-500">Approved</p>
              )}
            </div>
          </div>

          {/* Income */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Income</h3>
            <p className="text-xl font-semibold">{myData?.income ?? 0}</p>
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
                    Sender
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Receiver
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="border-b border-gray-100"
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.transactionType}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.senderPhone}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.receiverPhone}
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
