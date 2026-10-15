'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetRestaurantRealtimeStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Calendar,
    Tag,
    Users,
    UserCheck,
    Plus,
    UserPlus,
    Clock,
    ArrowUpRight
} from 'lucide-react';

export default function DashboardOverview() {
    const user = useSelector(currentUser);
    const { data: initialStatsRes, isLoading } = useGetRestaurantRealtimeStatsQuery({});
    const initialStats = initialStatsRes?.data;

    const [realtimeStats, setRealtimeStats] = useState<any>(null);

    useEffect(() => {
        if (initialStats) {
            setRealtimeStats(initialStats);
        }
    }, [initialStats]);

    useEffect(() => {
        if (!user?._id) return;

        const getSocketUrl = () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (apiUrl) {
                try {
                    const url = new URL(apiUrl);
                    return url.origin;
                } catch (e) {
                    console.error("Invalid NEXT_PUBLIC_API_URL:", e);
                }
            }
            return "https://api.getvibez.app";
        };

        const socketUrl = getSocketUrl();
        console.log(`🔌 Owner attempting to connect to socket at: ${socketUrl}`);

        const socket: Socket = io(socketUrl, {
            query: {
                _id: user._id,
                restaurantId: user.restaurantId || ''
            },
            transports: ['polling', 'websocket'],
            autoConnect: true,
            reconnection: true
        });

        socket.on("connect", () => {
            console.log("🔌 Connected to socket server with ID:", socket.id);
        });

        socket.on("restaurant_stats", (stats: any) => {
            console.log("📊 Real-time Dashboard Stats Update:", stats);
            setRealtimeStats((prev: any) => ({
                ...prev,
                ...stats
            }));
        });

        socket.on("connect_error", (error: any) => {
            console.error("🔌 Owner socket connection error:", error);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from socket server");
        });

        return () => {
            socket.disconnect();
            console.log("❌ Owner socket disconnected");
        };
    }, [user?._id, user?.restaurantId]);

    const stats = [
        {
            label: 'Total Bookings Today',
            value: realtimeStats?.totalBookingsToday?.count || 0,
            trend: realtimeStats?.totalBookingsToday?.change || '0 from yesterday',
            icon: Calendar,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600'
        },
        {
            label: 'Active Deals',
            value: realtimeStats?.activeDeals?.count || 0,
            trend: realtimeStats?.activeDeals?.change || 'Stable',
            icon: Tag,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            label: 'Total Customers Served',
            value: realtimeStats?.totalCustomersServed?.count || 0,
            trend: realtimeStats?.totalCustomersServed?.period || 'This month',
            icon: Users,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            label: 'Staff Active Today',
            value: realtimeStats?.staffOnlineNow?.count || 0,
            trend: realtimeStats?.staffOnlineNow?.status || 'No staff online',
            icon: UserCheck,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600'
        },
    ];

    const quickActions = [
        { name: 'Create New Deal', icon: Plus, primary: true, href: '/dashboard/deals' },
        { name: 'Add Staff', icon: UserPlus, primary: false, href: '/dashboard/staff' },
        { name: 'Set Weekly Schedule', icon: Clock, primary: false, href: '/dashboard/schedule' },
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-zinc-900">Restaurant Dashboard</h1>
                <p className="text-zinc-500">Manage your deals, staff, and daily operations from one place.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading && !realtimeStats ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                                <Skeleton className="w-12 h-12 rounded-xl" />
                                <Skeleton className="w-5 h-5 rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-24 h-4" />
                                <Skeleton className="w-16 h-8" />
                                <Skeleton className="w-32 h-3" />
                            </div>
                        </div>
                    ))
                ) : stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="text-zinc-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-zinc-900">{stat.value}</h3>
                                <p className="text-xs text-zinc-400 font-medium">{stat.trend}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-zinc-900">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.name}
                                href={action.href}
                                className={`flex items-center justify-center gap-3 p-5 rounded-xl font-bold transition-all active:scale-[0.98] border ${action.primary
                                        ? "bg-[#013622] text-white shadow-lg shadow-[#013622]/20 border-transparent hover:bg-[#012a1a]"
                                        : "bg-white text-[#013622] border-zinc-200 hover:border-[#013622] hover:bg-[#013622]/5"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{action.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
