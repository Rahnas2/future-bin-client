"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { topCitiesType } from "@/types/topCitiesType"
import React from "react"
import { getDateRangeLabel } from "@/utils/getDateRangeLabel"


type Props = {
    data: topCitiesType [],
    timeRange: string
}
const TopAreas:React.FC<Props> = ({data, timeRange}) => {
  console.log('data ', data)

const chartConfig = {
  count: {
    label: "count",
  }
} satisfies ChartConfig


  return (
    <Card className="bg-primary text-text border-gray-500 shadow-2xs flex w-sm">
      <CardHeader>
        <CardTitle>Top Areas</CardTitle>
        <CardDescription>{getDateRangeLabel(timeRange)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="city"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" barSize={35} fill="var(--accent)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {`Showing total visitors for the last ${timeRange === '6m' ? '6 months': timeRange === '30d'?  '30 days': timeRange === '7d' ? '7 days': '' }`}
        </div>
      </CardFooter>
    </Card>
  )
}

export default TopAreas