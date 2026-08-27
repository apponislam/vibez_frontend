"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Users, DollarSign, TrendingUp, Store, Tag, CalendarCheck, ArrowUpRight, User } from "lucide-react";
import { useGetAdminDashboardStatsQuery, useGetRevenueBreakdownQuery } from "../../../redux/features/dashboard/dashboardApi";
import { useGetAllUserSubscriptionsQuery } from "@/redux/features/admin/subscriptionApi";
import { useGetWeeklyBookingsQuery } from "../../../redux/features/reservations/reservationApi";
import { getImageUrl } from "@/lib/utils";

export default function AdminOverview() {
    const { data: statsData, isLoading: isStatsLoading } = useGetAdminDashboardStatsQuery(undefined);
    const { data: weeklyBookingsData, isLoading: isWeeklyBookingsLoading } = useGetWeeklyBookingsQuery(undefined);
    const { data: revenueBreakdownData, isLoading: isRevenueBreakdownLoading } = useGetRevenueBreakdownQuery(undefined);
    const { data: allSubscriptionsData, isLoading: isSubscriptionsLoading } = useGetAllUserSubscriptionsQuery({ limit: 5 });

    if (isStatsLoading || isWeeklyBookingsLoading || isRevenueBreakdownLoading || isSubscriptionsLoading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <p className="text-zinc-400 animate-pulse">Loading dashboard...</p>
            </div>
        );
    }

    const stats = statsData?.data;
    const formattedBookingData =
        weeklyBookingsData?.data?.currentWeek?.map((item: any) => ({
            day: item.day,
            bookings: item.count,
        })) || [];

    const formattedRevenueData = revenueBreakdownData?.data || [];

    const subscriptions = allSubscriptionsData?.data || [];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-zinc-500 text-sm mt-1">Monitor your restaurant marketplace performance</p>
            </div>

            {/* Stats Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">CHF {stats?.revenue?.totalRevenue || "0"}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">
                            Monthly: <span className="text-zinc-300">CHF {stats?.revenue?.monthlyRevenue || "0"}</span>
                        </span>
                        <span className="text-zinc-500">
                            Annual: <span className="text-zinc-300">CHF {stats?.revenue?.annualRevenue || "0"}</span>
                        </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.revenue?.growthPercentage || "0"}%
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Active Subscribers</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.subscribers?.totalActiveSubscribers || "0"}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Users className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">
                            Monthly: <span className="text-zinc-300">{stats?.subscribers?.activeMonthlySubscribers || "0"}</span>
                        </span>
                        <span className="text-zinc-500">
                            Trial: <span className="text-zinc-300">{stats?.subscribers?.activeTrialSubscribers || "0"}</span>
                        </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.subscribers?.growthPercentage || "0"}%
                    </div>
                </div>

                <div className="bg-[#171717] border border-[#10B981]/20 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Referral Revenue</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">CHF {stats?.referralRevenue?.totalReferralRevenue || "0"}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-[#10B981]" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">
                            Commission: <span className="text-zinc-300">CHF {stats?.referralRevenue?.totalCommissionPaid || "0"}</span>
                        </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.referralRevenue?.growthPercentage || "0"}%
                    </div>
                </div>
            </div>

            {/* Stats Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Active Restaurants</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.restaurants?.activeRestaurants || "0"}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Store className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">
                            Pending: <span className="text-zinc-300">{stats?.restaurants?.pendingRestaurants || "0"}</span>
                        </span>
                        <span className="text-zinc-500">
                            Suspended: <span className="text-zinc-300">{stats?.restaurants?.suspendedRestaurants || "0"}</span>
                        </span>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Active Deals</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.deals?.activeDeals || "0"}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Tag className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">
                            Expiring today: <span className="text-zinc-300">{stats?.deals?.expiringToday || "0"}</span>
                        </span>
                        <span className="text-zinc-500">
                            Drafts: <span className="text-zinc-300">{stats?.deals?.draftDeals || "0"}</span>
                        </span>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-zinc-500 text-[13px] font-medium mb-1">Total Bookings</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stats?.bookings?.totalBookings || "0"}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <CalendarCheck className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>
                    <div className="flex gap-4 text-[11px] font-medium">
                        <span className="text-zinc-500">
                            Today: <span className="text-zinc-300">{stats?.bookings?.todayBookings || "0"}</span>
                        </span>
                        <span className="text-zinc-500">
                            Weekly: <span className="text-zinc-300">{stats?.bookings?.weeklyBookings || "0"}</span>
                        </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {stats?.bookings?.growthPercentage || "0"}%
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <h3 className="text-base font-bold text-white mb-8">Revenue Breakdown</h3>
                    <div className="h-75 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={formattedRevenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#52525b", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#52525b", fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }} />
                                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <h3 className="text-base font-bold text-white mb-8">Weekly Bookings</h3>
                    <div className="h-75 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={formattedBookingData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#52525b", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#52525b", fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                                <Bar dataKey="bookings" fill="#10B981" radius={[6, 6, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8">
                    <h3 className="text-base font-bold text-white">Recent Subscriptions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Plan</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Price Details</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Referral & Commission</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">Dates</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {subscriptions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center text-zinc-500 text-sm">
                                        No recent subscriptions found
                                    </td>
                                </tr>
                            ) : (
                                subscriptions.map((sub: any, i: number) => (
                                    <tr key={sub._id || i} className="hover:bg-white/2 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                {sub.userId?.profileImage ? (
                                                    <img src={getImageUrl(sub.userId.profileImage)} alt={sub.userId.name} className="w-8 h-8 rounded-full object-cover bg-white/5" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-zinc-500" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-bold text-white">{sub.userId?.name || "Unknown User"}</p>
                                                    <p className="text-[11px] text-zinc-500">{sub.userId?.email || "No email"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="text-sm font-medium text-white">{sub.subscriptionPlanId?.name || "Unknown Plan"}</p>
                                            <p className="text-[11px] text-zinc-500">{sub.subscriptionPlanId?.duration}</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-white">CHF {sub.paidPrice !== undefined ? sub.paidPrice : sub.actualPrice || 0}</p>
                                                {sub.actualPrice !== undefined && sub.actualPrice !== sub.paidPrice && <p className="text-[11px] text-zinc-500 line-through">CHF {sub.actualPrice}</p>}
                                                {sub.percentOff ? <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{sub.percentOff}% off</span> : null}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-sm text-zinc-400">
                                            {sub.commissionUser ? (
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-white flex items-center gap-1">
                                                        <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                                                        {sub.commissionUser.name}
                                                    </p>
                                                    <p className="text-[11px] text-zinc-500">{sub.commissionUser.email}</p>
                                                    {sub.commissionAmount !== undefined && <p className="text-[11px] text-amber-500 font-semibold">Comm: CHF {sub.commissionAmount}</p>}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-zinc-600">—</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sub.status === "ACTIVE" ? "bg-[#10B981]/10 text-[#10B981]" : sub.status === "CANCELLED" || sub.status === "CANCELED" ? "bg-red-500/10 text-red-500" : "bg-zinc-500/10 text-zinc-400"}`}>
                                                    {sub.status || "UNKNOWN"}
                                                </span>
                                                {sub.isTrial && <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider">Trial</span>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="space-y-1 text-xs inline-block text-left">
                                                <p className="text-zinc-400">
                                                    <span className="text-zinc-600 font-medium text-[9px] uppercase">Start:</span> {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "N/A"}
                                                </p>
                                                <p className="text-white font-medium">
                                                    <span className="text-zinc-600 font-medium text-[9px] uppercase">End:</span> {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
