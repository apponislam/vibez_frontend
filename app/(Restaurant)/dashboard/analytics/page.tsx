"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { useGetRestaurantStatsQuery, useGetRestaurantBookingsPerDayQuery, useGetRestaurantLunchVsDinnerQuery } from "@/redux/features/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

const barConfig: ChartConfig = {
    count: { label: "Bookings", color: "#3B82F6" },
};

const pieConfig: ChartConfig = {
    Dinner: { label: "Dinner", color: "#3B82F6" },
    Lunch: { label: "Lunch", color: "#8B5CF6" },
};

const PIE_COLORS = ["#3B82F6", "#8B5CF6"];

export default function AnalyticsPage() {
    const { data: statsRes, isLoading: isLoadingStats } = useGetRestaurantStatsQuery({});
    const { data: bookingsRes, isLoading: isLoadingBookings } = useGetRestaurantBookingsPerDayQuery({});
    const { data: mealStatsRes, isLoading: isLoadingMealStats } = useGetRestaurantLunchVsDinnerQuery({});

    const stats = statsRes?.data;
    const barData = bookingsRes?.data || [];
    const pieData = mealStatsRes?.data || [];

    if (isLoadingStats || isLoadingBookings || isLoadingMealStats) {
        return (
            <div className="space-y-8 animate-pulse">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <Skeleton className="h-32 w-full rounded-[10px]" />
                        <Skeleton className="h-32 w-full rounded-[10px]" />
                        <Skeleton className="h-32 w-full rounded-[10px]" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-75 w-full rounded-[10px]" />
                    <Skeleton className="h-75 w-full rounded-[10px]" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Analytics</h1>
                <p className="text-zinc-500 text-sm mt-1">Detailed insights into your restaurant's deal and booking performance</p>
            </div>

            {/* Deal Performance Stats */}
            <div>
                <h2 className="text-base font-bold text-zinc-900 mb-4">Deal Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-2">Most Popular Deal</p>
                        <p className="text-lg font-bold text-zinc-900">{stats?.mostPopularDeal?.title || "N/A"}</p>
                        <p className={`text-xs font-semibold flex items-center gap-1 mt-1 ${stats?.mostPopularDeal?.usageChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                            <TrendingUp className={`w-3 h-3 ${stats?.mostPopularDeal?.usageChange < 0 ? "rotate-180" : ""}`} />
                            {stats?.mostPopularDeal?.usageChange >= 0 ? "+" : ""}
                            {stats?.mostPopularDeal?.usageChange || 0}% usage
                        </p>
                    </div>
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-2">Peak Time</p>
                        <p className="text-lg font-bold text-zinc-900">{stats?.peakTime?.mealTime || "N/A"}</p>
                        <p className="text-xs text-zinc-400 mt-1">{stats?.peakTime?.timeRange || "N/A"}</p>
                    </div>
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-5">
                        <p className="text-xs text-zinc-400 font-medium mb-2">Average Guests per Booking</p>
                        <p className="text-lg font-bold text-zinc-900">{stats?.averageGuests?.average || 0}</p>
                        <p className={`text-xs mt-1 ${stats?.averageGuests?.change >= 0 ? "text-zinc-400" : "text-red-400"}`}>
                            {stats?.averageGuests?.change > 0 ? "↑" : stats?.averageGuests?.change < 0 ? "↓" : ""} {Math.abs(stats?.averageGuests?.change || 0)} from last week
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6">
                    <h2 className="text-base font-bold text-zinc-900 mb-4">Bookings per Day</h2>
                    <ChartContainer config={barConfig} className="h-65 w-full">
                        <BarChart data={barData} barCategoryGap="30%" margin={{ bottom: 20 }}>
                            <CartesianGrid vertical={false} stroke="#F4F4F5" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={(props: any) => {
                                    const { x, y, payload, index } = props;
                                    const item = barData[index];
                                    if (!item) return null;
                                    return (
                                        <g transform={`translate(${x},${y})`}>
                                            <text x={0} y={0} dy={16} textAnchor="middle" fill="#71717A" fontSize={12} fontWeight={500}>
                                                {item.day}
                                            </text>
                                            <text x={0} y={0} dy={32} textAnchor="middle" fill="#A1A1AA" fontSize={10}>
                                                {item.date}
                                            </text>
                                        </g>
                                    );
                                }}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#A1A1AA" }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-[10px] border border-zinc-100 p-6">
                    <h2 className="text-base font-bold text-zinc-900 mb-4">Lunch vs Dinner Usage</h2>
                    <ChartContainer config={pieConfig} className="h-60 w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                                {pieData.map((_: any, i: number) => (
                                    <Cell key={i} fill={PIE_COLORS[i]} />
                                ))}
                            </Pie>
                            <Legend iconType="square" iconSize={10} formatter={(value) => <span className="text-xs text-zinc-600 font-medium">{value}</span>} />
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
