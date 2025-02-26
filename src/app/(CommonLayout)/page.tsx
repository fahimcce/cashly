import { Card } from "@/components/ui/card";
import {
  Wallet2,
  SendHorizontal,
  ArrowDownToLine,
  ArrowUpFromLine,
  Shield,
  Clock,
  Users,
  PhoneCall,
  CheckCircle,
  Smartphone,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wallet2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CashLy
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Your Trusted Mobile Financial Service Partner
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Started
            </button>
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <SendHorizontal className="h-12 w-12 text-blue-600" />
              <h2 className="text-xl font-semibold">Send Money</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Transfer money instantly to any CashLy user
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <ArrowDownToLine className="h-12 w-12 text-green-600" />
              <h2 className="text-xl font-semibold">Cash In</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Add money to your account through our agents
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <ArrowUpFromLine className="h-12 w-12 text-purple-600" />
              <h2 className="text-xl font-semibold">Cash Out</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Withdraw money from any CashLy agent point
              </p>
            </div>
          </Card>
        </div>

        {/* Why Choose CashLy Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose CashLy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bank-grade security for all your financial transactions
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access your money anytime, anywhere
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Wide Network</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Thousands of agents across the country
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <PhoneCall className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dedicated support team at your service
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experience the Future of Digital Payments
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                CashLy brings you the most convenient and secure way to handle
                your money. With our innovative mobile financial services, you
                can manage all your transactions with just a few taps.
              </p>
              <ul className="space-y-4">
                {[
                  "Instant money transfers",
                  "Nationwide agent network",
                  "Secure transactions",
                  "Low transaction fees",
                  "Real-time notifications",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20 blur-lg"></div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                <Smartphone className="h-20 w-20 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-center mb-4">
                  Download Our App
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                  Get started with CashLy today. Available for both Android and
                  iOS devices.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    App Store
                  </button>
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Play Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "1M+" },
              { label: "Daily Transactions", value: "500K+" },
              { label: "Agent Points", value: "50K+" },
              { label: "Cities Covered", value: "64" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white text-opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust CashLy for their daily financial
            transactions. Experience the convenience of digital payments today.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
            Create Free Account
          </button>
        </section>
      </div>
    </main>
  );
}
