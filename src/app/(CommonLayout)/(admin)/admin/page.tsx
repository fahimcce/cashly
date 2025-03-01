"use client";
import { useEffect, useState } from "react";
import {
  Wallet2,
  Eye,
  EyeOff,
  History,
  Users,
  Lock,
  Unlock,
  UserCog,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TMe, TTransaction } from "@/types";
import { getAllUsers, getMe, toggleUserStatus } from "@/services/AuthServices";
import { GetAllTransaction, totalMoney } from "@/services/TransactionServices";

export default function AdminDashboardPage() {
  const [showBalance, setShowBalance] = useState(false);
  const [adminBalance, setAdminBalance] = useState<number>(0);
  const [systemBalance, setSystemBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [users, setUsers] = useState<TMe[]>([]);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const adminData = await getMe();
        const systemData = await totalMoney();
        setAdminBalance(adminData.balance || 0);
        setSystemBalance(systemData.totalMoney || 0);
        console.log("system balance:", systemData);
      } catch (err) {
        toast.error("Failed to fetch balances");
      }
    };
    fetchBalances();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await GetAllTransaction();
      setTransactions(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        toast.error("Failed to fetch users");
      }
    })();
  }, []);

  const handleToggleUserStatus = async (
    phone: string,
    currentStatus: boolean
  ) => {
    setIsLoading((prev) => ({ ...prev, [phone]: true }));
    try {
      // Send the opposite of current status to toggle it
      await toggleUserStatus(phone, !currentStatus);
      // Update the user status in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.phone === phone ? { ...user, status: !user.isDeleted } : user
        )
      );
      toast.success(`User status updated successfully`);
      window.location.href = "/admin";
    } catch (err) {
      toast.error("Failed to update user status");
    } finally {
      setIsLoading((prev) => ({ ...prev, [phone]: false }));
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Wallet2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage system finances efficiently
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Income</CardTitle>
            <Wallet2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-2xl font-bold`}>৳ {adminBalance}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>System Balance</CardTitle>
            <Wallet2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {systemBalance}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <Dialog>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              All Transactions
            </h3>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <History className="text-gray-500" size={20} />
                <span className="text-gray-500">View All</span>
              </Button>
            </DialogTrigger>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Sender
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Receiver
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 3).map((transaction) => (
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

          <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                All Transactions
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh] pr-2">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Sender
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Receiver
                    </th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
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
          </DialogContent>
        </Dialog>
      </div>

      {/* Users */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <Dialog>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">All Users</h3>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Users className="text-gray-500" size={20} />
                <span className="text-gray-500">View All</span>
              </Button>
            </DialogTrigger>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Account Type
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                    Balance
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 3).map((user) => (
                  <tr key={user._id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.phone}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "agent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      ৳{user.balance.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={
                          () =>
                            handleToggleUserStatus(user.phone, user.isDeleted) // This sends the current 'isDeleted' status correctly
                        }
                        disabled={isLoading[user.phone]}
                        className={`${
                          user.isDeleted
                            ? "text-red-500 hover:text-red-700"
                            : "text-green-500 hover:text-green-700"
                        }`}
                      >
                        {isLoading[user.phone] ? (
                          <span className="animate-pulse">Processing...</span>
                        ) : user.isDeleted ? (
                          <>
                            <Lock className="h-4 w-4 mr-1" />
                            Block
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4 mr-1" />
                            Unblock
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                All Users
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh] pr-2">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Phone
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Account Type
                    </th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                      Balance
                    </th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                      Income
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {user.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {user.phone}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "agent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">
                        ৳{user.balance.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">
                        ৳{user.income.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleToggleUserStatus(user.phone, user.isDeleted)
                          }
                          disabled={isLoading[user.phone]}
                          className={`${
                            user.isDeleted
                              ? "text-red-500 hover:text-red-700"
                              : "text-green-500 hover:text-green-700"
                          }`}
                        >
                          {isLoading[user.phone] ? (
                            <span className="animate-pulse">Processing...</span>
                          ) : user.isDeleted ? (
                            <>
                              <Lock className="h-4 w-4 mr-1" />
                              Block
                            </>
                          ) : (
                            <>
                              <Unlock className="h-4 w-4 mr-1" />
                              Unblock
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
