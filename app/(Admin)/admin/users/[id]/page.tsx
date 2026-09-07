"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, ArrowUpRight, ArrowDownRight, UserCheck, ChevronDown } from "lucide-react";
import { useGetUserActivityQuery, useGetUserActivitySummaryQuery, useGetUserReferralsQuery, useGetUserCommissionsQuery, useGetUserWithdrawalsQuery, useGetUserSubscriptionsQuery } from "../../../../../redux/features/user/userApi";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

// updated

export default function UserActivityPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    // Expanded commission rows state
    const [expandedCommissions, setExpandedCommissions] = React.useState<Record<string, boolean>>({});

    const toggleCommissionExpand = (id: string) => {
        setExpandedCommissions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Pagination states
    const [referralsPage, setReferralsPage] = React.useState(1);
    const [commissionsPage, setCommissionsPage] = React.useState(1);
    const [withdrawalsPage, setWithdrawalsPage] = React.useState(1);
    const [subscriptionsPage, setSubscriptionsPage] = React.useState(1);

    // Queries
    const { data: activityRes, isLoading: isUserLoading } = useGetUserActivityQuery(id);
    const { data: summaryRes, isLoading: isSummaryLoading } = useGetUserActivitySummaryQuery(id);

    const { data: referralsRes, isLoading: isReferralsLoading } = useGetUserReferralsQuery({ id, page: referralsPage, limit: 5 });
    const { data: commissionsRes, isLoading: isCommissionsLoading } = useGetUserCommissionsQuery({ id, page: commissionsPage, limit: 5 });
    const { data: withdrawalsRes, isLoading: isWithdrawalsLoading } = useGetUserWithdrawalsQuery({ id, page: withdrawalsPage, limit: 5 });
    const { data: subscriptionsRes, isLoading: isSubscriptionsLoading } = useGetUserSubscriptionsQuery({ id, page: subscriptionsPage, limit: 5 });

    if (isUserLoading || isSummaryLoading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <p className="text-zinc-400 animate-pulse">Loading user activity...</p>
            </div>
        );
    }

    const { user } = activityRes?.data || {};
    const { totalReferrals, activeSubsFromReferrals, totalWithdrawals, totalSubscriptions } = summaryRes?.data || {};

    if (!user) {
        return (
            <div className="flex flex-col h-100 items-center justify-center gap-4">
                <p className="text-zinc-400">User not found.</p>
                <button onClick={() => router.back()} className="text-[#10B981] hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    const referrals = referralsRes?.data || [];
    const referralsMeta = referralsRes?.meta || { page: 1, limit: 5, total: 0, totalPages: 1, hasNext: false, hasPrev: false };

    const commissions = commissionsRes?.data || [];
    const commissionsMeta = commissionsRes?.meta || { page: 1, limit: 5, total: 0, totalPages: 1, hasNext: false, hasPrev: false };

    const withdrawals = withdrawalsRes?.data || [];
    const withdrawalsMeta = withdrawalsRes?.meta || { page: 1, limit: 5, total: 0, totalPages: 1, hasNext: false, hasPrev: false };

    const subscriptions = subscriptionsRes?.data || [];
    const subscriptionsMeta = subscriptionsRes?.meta || { page: 1, limit: 5, total: 0, totalPages: 1, hasNext: false, hasPrev: false };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                    <ArrowLeft className="w-5 h-5 text-zinc-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">User Profile & Activity</h1>
                    <p className="text-zinc-500 text-sm mt-1">Detailed overview of user activity and transactions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="space-y-6">
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                {user.profileImage ? <Image src={getImageUrl(user.profileImage)} alt={user.name} width={64} height={64} className="w-full h-full object-cover" /> : <span className="text-2xl font-bold text-zinc-500">{user.name?.charAt(0)}</span>}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                <span className={`inline-flex px-2 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider ${user.isInfluencer ? "bg-[#10B981]/10 text-[#10B981]" : "bg-[#1447E6]/10 text-[#1447E6]"}`}>{user.isInfluencer ? "Influencer" : "User"}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">{user.phone || "N/A"}</span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm border-t border-white/5 pt-4 mt-2">
                                <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-2">Location</span>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                                    <span className="text-zinc-300 text-xs">{user.address ? `${user.address.street || ""}, ${user.address.city || ""}, ${user.address.country || ""}` : "No address provided"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm border-t border-white/5 pt-4">
                                <Calendar className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Referral Settings</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Referral Code</span>
                                <span className="text-xs font-mono font-bold bg-white/5 px-2 py-1 rounded text-zinc-300">{user.referralCode || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Commission Rate</span>
                                <span className="text-sm font-bold text-[#10B981]">{user.commissionPercentage}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Max Payout limit</span>
                                <span className="text-sm font-bold text-white">CHF {user.maxPayout}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Current Balance</span>
                                <span className="text-sm font-bold text-white">CHF {user.balance}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Total Referrals</p>
                            <h3 className="text-xl font-bold text-white">{totalReferrals ?? 0}</h3>
                        </div>
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Active Subs from Referrals</p>
                            <h3 className="text-xl font-bold text-[#10B981]">{activeSubsFromReferrals ?? 0}</h3>
                        </div>
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Total Subscriptions</p>
                            <h3 className="text-xl font-bold text-white">{totalSubscriptions ?? 0}</h3>
                        </div>
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-4">
                            <p className="text-zinc-500 text-xs font-medium mb-1">Total Withdrawals</p>
                            <h3 className="text-xl font-bold text-white">{totalWithdrawals ?? 0}</h3>
                        </div>
                    </div>

                    {/* Subscriptions */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden relative">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-purple-500" /> Subscription History
                            </h3>
                        </div>
                        <div className="overflow-x-auto min-h-[120px]">
                            {isSubscriptionsLoading ? (
                                <div className="flex h-24 items-center justify-center">
                                    <p className="text-zinc-500 text-xs animate-pulse">Loading subscriptions...</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-white/2">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Plan Name</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {subscriptions.length > 0 ? (
                                            subscriptions.map((sub: any, i: number) => (
                                                <tr key={i} className="hover:bg-white/2">
                                                    <td className="px-6 py-4 text-sm font-bold text-white">{sub.subscriptionPlanId?.name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === "ACTIVE" ? "bg-[#10B981]/10 text-[#10B981]" : "bg-red-500/10 text-red-500"}`}>{sub.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-zinc-300">CHF {sub.subscriptionPlanId?.price}</td>
                                                    <td className="px-6 py-4 text-xs text-zinc-500">{new Date(sub.startDate).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-xs text-zinc-500">{new Date(sub.endDate).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-sm">
                                                    No subscriptions found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {subscriptionsMeta.totalPages > 1 && (
                            <div className="p-4 border-t border-white/5 flex items-center justify-between">
                                <p className="text-xs text-zinc-500">
                                    Page {subscriptionsMeta.page} of {subscriptionsMeta.totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSubscriptionsPage((p) => Math.max(1, p - 1))}
                                        disabled={!subscriptionsMeta.hasPrev || isSubscriptionsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${subscriptionsMeta.hasPrev ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setSubscriptionsPage((p) => p + 1)}
                                        disabled={!subscriptionsMeta.hasNext || isSubscriptionsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${subscriptionsMeta.hasNext ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Referrals */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden relative">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-[#10B981]" /> Recent Referrals
                            </h3>
                        </div>
                        <div className="overflow-x-auto min-h-[120px]">
                            {isReferralsLoading ? (
                                <div className="flex h-24 items-center justify-center">
                                    <p className="text-zinc-500 text-xs animate-pulse">Loading referrals...</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-white/2">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Plan</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Joined Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {referrals.length > 0 ? (
                                            referrals.map((ref: any, i: number) => (
                                                <tr key={i} className="hover:bg-white/2">
                                                    <td className="px-6 py-4 text-sm font-bold text-white">{ref.name}</td>
                                                    <td className="px-6 py-4 text-sm text-zinc-300">{ref.planName || "N/A"}</td>
                                                    <td className="px-6 py-4 text-sm text-zinc-300">{ref.status || "Active"}</td>
                                                    <td className="px-6 py-4 text-xs text-zinc-500">{new Date(ref.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">
                                                    No referrals found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {referralsMeta.totalPages > 1 && (
                            <div className="p-4 border-t border-white/5 flex items-center justify-between">
                                <p className="text-xs text-zinc-500">
                                    Page {referralsMeta.page} of {referralsMeta.totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setReferralsPage((p) => Math.max(1, p - 1))}
                                        disabled={!referralsMeta.hasPrev || isReferralsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${referralsMeta.hasPrev ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setReferralsPage((p) => p + 1)}
                                        disabled={!referralsMeta.hasNext || isReferralsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${referralsMeta.hasNext ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Commissions */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden relative">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <ArrowDownRight className="w-4 h-4 text-[#10B981]" /> Commission History
                            </h3>
                        </div>
                        <div className="overflow-x-auto min-h-[120px]">
                            {isCommissionsLoading ? (
                                <div className="flex h-24 items-center justify-center">
                                    <p className="text-zinc-500 text-xs animate-pulse">Loading commissions...</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-white/2">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Source User</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Rate</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Max Payout</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Paid Duration</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-right">History</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {commissions.length > 0 ? (
                                            commissions.map((c: any, i: number) => (
                                                <React.Fragment key={c._id || i}>
                                                    <tr className="hover:bg-white/2 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-bold text-white">{c.commissionFrom?.name || "Unknown"}</div>
                                                            <div className="text-[11px] text-zinc-500">{c.commissionFrom?.email || ""}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-zinc-300 font-medium">{c.commissionPercentage}%</td>
                                                        <td className="px-6 py-4 text-sm text-zinc-300 font-bold">CHF {c.maxPayout}</td>
                                                        <td className="px-6 py-4 text-sm text-zinc-400">
                                                            {c.commissionPaidCount} / {c.commissionDuration} Months
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                onClick={() => toggleCommissionExpand(c._id)}
                                                                disabled={!c.history || c.history.length === 0}
                                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                                                    c.history && c.history.length > 0 ? "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white" : "text-zinc-600 cursor-not-allowed"
                                                                }`}
                                                            >
                                                                <span>{c.history?.length || 0} Payouts</span>
                                                                {c.history && c.history.length > 0 && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedCommissions[c._id] ? "rotate-180" : ""}`} />}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {expandedCommissions[c._id] && c.history && c.history.length > 0 && (
                                                        <tr>
                                                            <td colSpan={5} className="bg-white/[0.01] px-8 py-4 border-b border-white/5">
                                                                <div className="rounded-xl border border-white/5 overflow-hidden">
                                                                    <table className="w-full text-left">
                                                                        <thead className="bg-white/2 border-b border-white/5">
                                                                            <tr>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Invoice ID</th>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Plan</th>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Original Price</th>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Discount</th>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Paid Amount</th>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Commission</th>
                                                                                <th className="px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider text-right">Payout Date</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-white/5">
                                                                            {c.history.map((h: any, idx: number) => {
                                                                                const sub = h.userSubscriptionId;
                                                                                const discountDisplay = sub ? (sub.percentOff ? `${sub.percentOff}% Off` : sub.amountOff ? `CHF ${sub.amountOff} Off` : "None") : "-";
                                                                                return (
                                                                                    <tr key={idx} className="hover:bg-white/2">
                                                                                        <td className="px-4 py-2 text-xs font-mono text-zinc-400">{h.invoiceId}</td>
                                                                                        <td className="px-4 py-2 text-xs font-bold text-white">{sub?.subscriptionPlanId?.name || "-"}</td>
                                                                                        <td className="px-4 py-2 text-xs text-zinc-400">{sub?.actualPrice ? `CHF ${sub.actualPrice}` : "-"}</td>
                                                                                        <td className="px-4 py-2 text-xs text-zinc-400">{discountDisplay}</td>
                                                                                        <td className="px-4 py-2 text-xs font-bold text-white">{sub?.paidPrice ? `CHF ${sub.paidPrice}` : "-"}</td>
                                                                                        <td className="px-4 py-2 text-xs font-bold text-[#10B981]">CHF {h.amount}</td>
                                                                                        <td className="px-4 py-2 text-xs text-zinc-500 text-right">{new Date(h.createdAt).toLocaleDateString()}</td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-sm">
                                                    No commissions found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {commissionsMeta.totalPages > 1 && (
                            <div className="p-4 border-t border-white/5 flex items-center justify-between">
                                <p className="text-xs text-zinc-500">
                                    Page {commissionsMeta.page} of {commissionsMeta.totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCommissionsPage((p) => Math.max(1, p - 1))}
                                        disabled={!commissionsMeta.hasPrev || isCommissionsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${commissionsMeta.hasPrev ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCommissionsPage((p) => p + 1)}
                                        disabled={!commissionsMeta.hasNext || isCommissionsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${commissionsMeta.hasNext ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Withdrawals */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden relative">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4 text-orange-500" /> Withdrawal History
                            </h3>
                        </div>
                        <div className="overflow-x-auto min-h-[120px]">
                            {isWithdrawalsLoading ? (
                                <div className="flex h-24 items-center justify-center">
                                    <p className="text-zinc-500 text-xs animate-pulse">Loading withdrawals...</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-white/2">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Method</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {withdrawals.length > 0 ? (
                                            withdrawals.map((w: any, i: number) => (
                                                <tr key={i} className="hover:bg-white/2">
                                                    <td className="px-6 py-4 text-sm font-bold text-white">CHF {w.amount}</td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${w.status === "APPROVED" ? "bg-[#10B981]/10 text-[#10B981]" : w.status === "PENDING" ? "bg-orange-500/10 text-orange-500" : "bg-red-500/10 text-red-500"}`}
                                                        >
                                                            {w.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-zinc-300">{w.paymentMethod}</td>
                                                    <td className="px-6 py-4 text-xs text-zinc-500">{new Date(w.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">
                                                    No withdrawals found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {withdrawalsMeta.totalPages > 1 && (
                            <div className="p-4 border-t border-white/5 flex items-center justify-between">
                                <p className="text-xs text-zinc-500">
                                    Page {withdrawalsMeta.page} of {withdrawalsMeta.totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setWithdrawalsPage((p) => Math.max(1, p - 1))}
                                        disabled={!withdrawalsMeta.hasPrev || isWithdrawalsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${withdrawalsMeta.hasPrev ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setWithdrawalsPage((p) => p + 1)}
                                        disabled={!withdrawalsMeta.hasNext || isWithdrawalsLoading}
                                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${withdrawalsMeta.hasNext ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
