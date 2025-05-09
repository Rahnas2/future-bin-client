
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
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
import React from "react";
import { pickupRequestTrendType } from "@/types/pickupRequestTrendType";

const chartConfig = {
  onDemand: {
    label: "On Demand",
    color: "var(--color-accent2)",
  },
  subscription: {
    label: "Subscription",
    color: "var(--color-accent3)",
  },
} satisfies ChartConfig;

type Props = {
  timeRange: string;
  setTimeRange: (value: string) => void;
  data: pickupRequestTrendType[] | undefined;
  fromDate: Date;
  toDate: Date;
};

const RequestChart: React.FC<Props> = ({
  timeRange,
  setTimeRange,
  data,
  fromDate,
  toDate
}) => {
  // Process data to ensure all dates are present
  const processedData = React.useMemo(() => {

    if (!data || data.length === 0) {
      const emptyData: pickupRequestTrendType[] = [];
      let currentDate = new Date(fromDate);
      const endDate = new Date(toDate);

      while (currentDate <= endDate) {
        emptyData.push({
          date: currentDate.toISOString().split('T')[0],
          onDemand: 0,
          subscription: 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return emptyData;
    }

    // Create a map of existing data by date string (YYYY-MM-DD)
    const dataMap = new Map(
      data.map(item => [
        new Date(item.date).toISOString().split('T')[0],
        {
          ...item,
          date: new Date(item.date).toISOString().split('T')[0],
        },
      ])
    );
    console.log('data map ', dataMap)

    // Fill in all dates in the range
    const filledData: pickupRequestTrendType[] = [];
    let currentDate = new Date(fromDate);
    currentDate.setHours(0, 0, 0, 0);

    // const endDate = new Date(toDate);
    // endDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);


    console.log('current date here  ', currentDate)
    console.log('end date here ', endDate)

    while (currentDate <= endDate) {
      console.log('current date iso ', currentDate)
      console.log('end date iso ', endDate)

      const dateStr = currentDate.toLocaleDateString('en-CA')
      filledData.push(
        dataMap.get(dateStr) || {
          date: dateStr,
          onDemand: 0,
          subscription: 0,
        }
      );
      currentDate.setDate(currentDate.getDate() + 1);

    }
    console.log('filled dates ', filledData)

    return filledData;
  }, [data, fromDate, toDate]);

  // Generate ticks for the X-axis based on time range
  const generateTicks = React.useMemo(() => {
    if (processedData.length === 0) return [];

    const ticks: string[] = [];

    if (timeRange === '7d') {
      // Show every day for 7 days
      return processedData.map(item => item.date);
    } else if (timeRange === '30d') {
      // Show approximately 5-6 ticks for 30 days
      const interval = Math.floor(processedData.length / 5);
      for (let i = 0; i < processedData.length; i += interval) {
        ticks.push(processedData[i].date);
      }
      // Ensure the last date is included
      const lastDate = processedData[processedData.length - 1].date;
      if (!ticks.includes(lastDate)) {
        ticks.push(lastDate);
      }
    } else {
      // For 6 months, show one tick per month
      const monthSet = new Set<string>();
      processedData.forEach(item => {
        const date = new Date(item.date);
        // const monthYear = `${date.getFullYear()}-${date.getMonth()}`;
        // if (!monthSet.has(monthYear)) {
        //   monthSet.add(monthYear);
        //   // Use the first day of the month for the tick
        //   ticks.push(new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0]);
        // }
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!monthSet.has(monthKey)) {
          monthSet.add(monthKey);
          console.log('date here ', date)
          const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          console.log('first date of motnh ', firstDayOfMonth)
          console.log('firs dat of month after change ', firstDayOfMonth.toISOString())
          ticks.push(firstDayOfMonth.toLocaleDateString('en-CA'));
        }
      });
    }
    console.log('tics ', ticks)
    return ticks;
  }, [processedData, timeRange]);

  // Format the date string based on the time range
  const formatDate = (dateStr: string) => {
    console.log('date str ', dateStr)
    const date = new Date(dateStr);
    if (timeRange === '7d') {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else if (timeRange === '30d') {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else {
      return date.toLocaleDateString("en-US", { month: "short" });
    }
  };

  // Format tooltip date with more detail
  const formatTooltipDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="bg-primary text-text border-gray-500 shadow-2xl">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Request Analysis</CardTitle>
          <CardDescription>
            {`Showing total requests for the last ${timeRange === '6m' ? '6 months' :
              timeRange === '30d' ? '30 days' :
                timeRange === '7d' ? '7 days' : ''
              }`}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Last 6 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {processedData.length > 0 ? (
            <AreaChart data={processedData}>
              <defs>
                <linearGradient id="fillOnDemand" x1="0" y1="0" x2="0" y2="1">
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
                <linearGradient id="fillSubscription" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-accent3)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-accent3)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                ticks={generateTicks}
                tickFormatter={formatDate}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={formatTooltipDate}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="onDemand"
                type="monotone"
                fill="url(#fillOnDemand)"
                stroke="var(--color-accent2)"
                stackId="a"
                name="On Demand"
              />
              <Area
                dataKey="subscription"
                type="monotone"
                fill="url(#fillSubscription)"
                stroke="var(--color-accent3)"
                stackId="a"
                name="Subscription"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No data available for the selected time range</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RequestChart;