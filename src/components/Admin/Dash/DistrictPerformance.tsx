
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
} from "@/components/ui/chart"
import { districtPerformanceType } from "@/types/districtPerformaceType"
import React from "react"
import { getDateRangeLabel } from "@/utils/getDateRangeLabel"

type Props = {
    data: districtPerformanceType[]
    timeRange: string
}

const DistrictPerformance: React.FC<Props> = ({ data, timeRange }) => {
    // Create chart config based on your data structure
    const chartConfig = {
        districtRequestCount: {
            label: "District",
            color: "(--color-accent)",
        },
        topCityCount: {
            label: "City",
            color: "var(--color-seconday)",
        },
    } satisfies ChartConfig

    return (
        <Card className="bg-primary text-text border-gray-500 shadow-2xs w-2xl">
            <CardHeader>
                <CardTitle>District Performance</CardTitle>
                <CardDescription>{getDateRangeLabel(timeRange)}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="district"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={(props) => {
                                const { active, payload } = props;
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload as districtPerformanceType;
                                    return (
                                        <div className="rounded-md border p-2 shadow-md">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex items-center">
                                                    <div className="mr-1 h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" />
                                                    <span className="text-xs">{data.district}:</span>
                                                </div>
                                                <span className="text-xs font-semibold">{data.districtRequestCount}</span>
                                                
                                                <div className="flex items-center">
                                                    <div className="mr-1 h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]" />
                                                    <span className="text-xs">{data.topCity}:</span>
                                                </div>
                                                <span className="text-xs font-semibold">{data.topCityCount}</span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="districtRequestCount"
                            fill="var(--accent)"
                            radius={4}
                            name="District"
                        />
                        <Bar
                            dataKey="topCityCount"
                            fill="var(--color-seconday)"
                            radius={4}
                            name="City"
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    S{`Showing total visitors for the last ${timeRange === '6m' ? '6 months': timeRange === '30d'?  '30 days': timeRange === '7d' ? '7 days': '' }`}
                </div>
            </CardFooter>
        </Card>
    )
}

export default DistrictPerformance
