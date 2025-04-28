

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { transactionAnalyticsApi } from "@/api/transactionsService"
import { CalendarIcon } from "lucide-react"
import toast from "react-hot-toast"



const chartConfig = {

} satisfies ChartConfig

function RevenueChart() {
  const [activeFilter, setActiveFilter] = useState('yearly')
  const [chartData, setChartData] = useState<{ x: string, y: number }[]>([])

  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [showDatePickers, setShowDatePickers] = useState(false)



  //Fetch Analytics 
  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      let queryParams = `filter=${activeFilter}`;

      // Add date parameters for custom filter
      if (activeFilter === 'custom' && fromDate && toDate) {
        queryParams += `&startDate=${fromDate}&endDate=${toDate}`;
      }

      const result = await transactionAnalyticsApi(queryParams)

      setChartData(result.analytics);

    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set default dates for custom filter
    if (activeFilter === 'custom') {
      setShowDatePickers(true);

      // Set default date range if not already set (e.g., last 7 days)
      const defaultEndDate = new Date();
      const defaultStartDate = new Date();
      defaultStartDate.setDate(defaultStartDate.getDate() - 7);

      setFromDate(defaultStartDate);
      setToDate(defaultEndDate);
    } else {
      setShowDatePickers(false);
      fetchAnalyticsData();
    }
  }, [activeFilter]);



  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };


  return (
    <Card className="bg-primary text-text border-gray-500 shadow-2xl">
      <CardHeader className="flex items-stretch space-y-0 border-b px-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            {activeFilter === 'yearly' && 'Yearly revenue breakdown'}
            {activeFilter === 'monthly' && 'Monthly revenue breakdown'}
            {activeFilter === 'custom' && 'Custom date range revenue'}
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Select value={activeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a filter"
            >
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="yearly" className="rounded-lg">
                Yearly
              </SelectItem>
              <SelectItem value="monthly" className="rounded-lg">
                Monthly
              </SelectItem>
              <SelectItem value="custom" className="rounded-lg">
                Custom Range
              </SelectItem>
            </SelectContent>
          </Select>

          {showDatePickers && (
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[140px] justify-start text-left font-normal text-white bg-transparent hover:bg-transparent hover:text-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? fromDate.toLocaleDateString() : "From Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={(date) => {
                        if (date) setFromDate(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[140px] justify-start text-left font-normal text-white bg-transparent hover:bg-transparent hover:text-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? toDate.toLocaleDateString() : "To Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={(date) => {
                        if (date) setToDate(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Apply Button */}
              <Button
                variant="ghost"
                className=""
                onClick={() => {
                  if (fromDate > toDate) {
                    toast("Start date cannot be after end date!");
                    return;
                  }
                  fetchAnalyticsData();
                }}
              >
                Apply
              </Button>
            </div>
          )}

        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-[250px]">
            <p>Loading data...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex justify-center items-center h-[250px]">
            <p>No data available for the selected period</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 30,
                right: 10,
                top: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="x"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px] text-seconday"
                    formatter={(value) => `$${value}`}
                  />
                }
              />
              <Line
                dataKey="y"
                type="monotone"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={true}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}


export default RevenueChart