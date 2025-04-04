import { Cell, Label, Pie, PieChart } from "recharts"

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

type Props = {
    data: { city: string, count: number }[]
    total: number
}


const colorMap = [
    "#62B2FD",
    "#9BDFC4",
    "#F99BAB",
    "#FFB44F",
    "#FFB44F",
    "#9F97F7"
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "#62B2FD",
    },
    safari: {
        label: "Safari",
        color: "#9BDFC4",
    },
    firefox: {
        label: "Firefox",
        color: "#F99BAB",
    },
    edge: {
        label: "Edge",
        color: "#FFB44F",
    },
    other: {
        label: "Other",
        color: "#9F97F7",
    },
} satisfies ChartConfig



const AreaChart = (props: Props) => {

    return (
        <Card className="flex flex-col bg-seconday text-text border-gray-500">
            <CardHeader className="items-center pb-0">
                <CardTitle className="font-medium text-2xl">Area Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={ chartConfig }
                    className="mx-auto aspect-square max-h-[250px] min-h-[250px]"
                >
                    <PieChart className="">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={props.data}
                            dataKey="count"
                            nameKey="city"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            {props.data.map((entry, index) => (
                                <Cell key={`cell-${entry.city}`} fill={colorMap[index] || "#ccc"} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-text text-3xl font-bold"
                                                >
                                                    {props.total}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Collections
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
                <CardFooter className="text-sm">
                <div className="flex w-full items-center gap-2 font-medium ">
                    {props.data.map((entry, index) => (
                        <div key={index} className="flex w-full justify-center items-center gap-5">
                            <span className={` w-3 h-3 rounded-full`}  style={{ backgroundColor: colorMap[index] }}></span>
                            <span>{entry.city}</span>
                            <span>{entry.count}</span>
                        </div>
                    ))}

                </div>
                </CardFooter>
        </Card>
    )
}

export default AreaChart