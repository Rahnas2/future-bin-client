import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define transaction type
export interface Transaction {
  id: string;
  amount: number; // In cents (Stripe convention)
  status: "succeeded" | "pending" | "failed";
  customer_email: string | null;
  created: number; // Unix timestamp
  currency: string;
}

// Define chart data type
interface ChartData {
  period: string;
  revenue: number;
}

// Chart configuration
const chartConfig = {
  revenue: {
    label: "Revenue (USD)",
    color: "var(--color-accent2)",
  },
} satisfies ChartConfig;

const RevenueChart: React.FC = () => {
  const [filter, setFilter] = useState<"yearly" | "monthly" | "custom">("yearly");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle filter change with type validation
  const handleFilterChange = (value: string) => {
    if (["yearly", "monthly", "custom"].includes(value)) {
      setFilter(value as "yearly" | "monthly" | "custom");
    } else {
      console.warn(`Invalid filter value: ${value}`);
    }
  };

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        let from: Date;
        let to = new Date();
        to.setHours(23, 59, 59, 999);

        if (filter === "yearly") {
          from = new Date();
          from.setFullYear(from.getFullYear() - 5);
          from.setHours(0, 0, 0, 0);
        } else if (filter === "monthly") {
          from = new Date();
          from.setMonth(from.getMonth() - 12);
          from.setHours(0, 0, 0, 0);
        } else {
          from = startDate || new Date(new Date().setDate(new Date().getDate() - 30)); // Default to last 30 days
          to = endDate || new Date();
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
        }


      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filter, startDate, endDate]);

  // Process chart data
  const chartData = useMemo(() => {
    if (!transactions.length) {
      console.log("No transactions available for chart data");
      return [];
    }

    const dataMap = new Map<string, number>();

    transactions.forEach((tx) => {
      const date = new Date(tx.created * 1000);
      let period: string;

      if (filter === "yearly") {
        period = date.getFullYear().toString();
      } else if (filter === "monthly") {
        period = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      } else {
        period = date.toISOString().split("T")[0]; // YYYY-MM-DD
      }

      const amount = tx.amount / 100; // Convert cents to dollars
      dataMap.set(period, (dataMap.get(period) || 0) + amount);
    });

    // Generate all periods in the range
    const result: ChartData[] = [];
    let current: Date;
    if (filter === "yearly") {
      current = new Date();
      current.setFullYear(current.getFullYear() - 5);
      for (let i = 0; i <= 5; i++) {
        const period = current.getFullYear().toString();
        result.push({
          period,
          revenue: dataMap.get(period) || 0,
        });
        current.setFullYear(current.getFullYear() + 1);
      }
    } else if (filter === "monthly") {
      current = new Date();
      current.setMonth(current.getMonth() - 12);
      for (let i = 0; i <= 12; i++) {
        const period = `${current.getFullYear()}-${(current.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        result.push({
          period,
          revenue: dataMap.get(period) || 0,
        });
        current.setMonth(current.getMonth() + 1);
      }
    } else {
      current = new Date(startDate || (transactions[0]?.created * 1000) || new Date().setDate(new Date().getDate() - 30));
      const end = new Date(endDate || new Date());
      current.setHours(0, 0, 0, 0);
      while (current <= end) {
        const period = current.toISOString().split("T")[0];
        result.push({
          period,
          revenue: dataMap.get(period) || 0,
        });
        current.setDate(current.getDate() + 1);
      }
    }

    console.log("Processed chart data:", result);
    return result;
  }, [transactions, filter, startDate, endDate]);

  // Format X-axis ticks
  const formatTick = (period: string) => {
    if (filter === "yearly") {
      return period; // e.g., "2023"
    } else if (filter === "monthly") {
      const [year, month] = period.split("-");
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
        "en-US",
        { month: "short", year: "numeric" }
      ); // e.g., "Jan 2023"
    } else {
      return new Date(period).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }); // e.g., "Apr 23"
    }
  };

  // Format tooltip label
  const formatTooltipLabel = (period: string) => {
    if (filter === "yearly") {
      return period;
    } else if (filter === "monthly") {
      const [year, month] = period.split("-");
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
        "en-US",
        { month: "long", year: "numeric" }
      );
    } else {
      return new Date(period).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div>
      {/* Revenue Chart */}
      <Card className="mb-10 bg-primary border-gray-500 text-white">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Total revenue from transactions
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            {filter === "custom" && (
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="border rounded-md px-3 py-2"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                //   minDate={startDate}
                  placeholderText="End Date"
                  className="border rounded-md px-3 py-2"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            {chartData.length > 0 ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-accent2)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-accent2)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={formatTick}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={formatTooltipLabel}
                    //   valueFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                  }
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#fillRevenue)"
                  stroke="var(--color-accent2)"
                  name="Revenue"
                />
              </AreaChart>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">
                  {loading
                    ? "Loading data..."
                    : "No data available for the selected period"}
                </p>
              </div>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueChart;