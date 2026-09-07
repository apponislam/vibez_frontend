"use client";

import React, { useState, useEffect } from "react";
import { Users, UserCheck, Award, Crown, Search, Filter, Edit3, Eye, Ban, CheckCircle, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetUserStatsQuery, useGetAllUsersQuery, useToggleUserStatusMutation, useUpdateUserMutation } from "../../../../redux/features/user/userApi";

export default function UserManagement() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [editingUser, setEditingUser] = useState<any>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: userStatsRes, isLoading: isStatsLoading } = useGetUserStatsQuery(undefined);
    const { data: usersRes, isLoading: isUsersLoading } = useGetAllUsersQuery({
        page,
        limit: 10,
        search: debouncedSearch,
    });
    const [toggleUserStatus] = useToggleUserStatusMutation();

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await toggleUserStatus(id).unwrap();
            toast.success(`User successfully ${currentStatus ? "banned" : "unbanned"}`);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to toggle user status");
        }
    };

    if (isStatsLoading || isUsersLoading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <p className="text-zinc-400 animate-pulse">Loading users...</p>
            </div>
        );
    }

    const stats = userStatsRes?.data || { totalUser: 0, regularCustomer: 0, influencer: 0, premiumUser: 0 };
    const dynamicUsers = usersRes?.data || [];
    const meta = usersRes?.meta || { page: 1, limit: 10, total: dynamicUsers.length, totalPages: 1, hasNext: false, hasPrev: false };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage all users, customers, and influencers</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Total Users</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.totalUser}</h3>
                    <p className="text-[11px] text-[#10B981] font-bold uppercase tracking-wider">All registered users</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Users className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Regular Customers</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.regularCustomer}</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Standard users</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Influencers</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.influencer}</h3>
                    <p className="text-[11px] text-[#10B981] font-bold">With custom commissions</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#10B981]" />
                    </div>
                </div>

                <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 relative">
                    <p className="text-zinc-500 text-[12px] font-medium mb-1">Premium Users</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.premiumUser}</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Annual subscribers</p>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#171717] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                    <h3 className="text-base font-bold text-white">All Users</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[12px] text-white focus:outline-none focus:border-[#10B981]/50 w-64"
                            />
                        </div>
                        {/* <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[12px] text-zinc-400 font-medium">
                            <Filter className="w-4 h-4" />
                        </button> */}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/1">
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Type</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Referral Code</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Referrals</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Active Subs</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Earnings</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Commission</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Subscription</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {dynamicUsers.map((user: any, i: number) => (
                                <tr key={i} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors cursor-pointer">{user.name}</p>
                                            <p className="text-[11px] text-zinc-500">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        {user.role === "ADMIN" ? (
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500">Admin</span>
                                        ) : user.role === "RESTAURANT_OWNER" ? (
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500">Restaurant Owner</span>
                                        ) : user.isInfluencer && user.subscriptionPlanId ? (
                                            <span className="inline-flex flex-col items-start px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981] leading-tight">
                                                <span>Influencer &</span>
                                                <span>Premium User</span>
                                            </span>
                                        ) : user.isInfluencer ? (
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981]">Influencer</span>
                                        ) : user.subscriptionPlanId ? (
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981]">Premium User</span>
                                        ) : (
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#1447E6]/10 text-[#1447E6]">Regular User</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">{user.referralCode || user.code || "-"}</span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-white text-center">{user.referralsTotalCount ?? user.referrals ?? 0}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-400 text-center">{user.activeSubscriptionFromHimTotal ?? user.subs ?? 0}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-white">{typeof user.balance === "number" ? `CHF ${user.balance}` : user.earnings || "CHF 0"}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-[#10B981]">{user.commissionPercentage ?? user.percentage ?? (user.commission ? parseInt(user.commission) : 0)}%</td>
                                    <td className="px-8 py-5 text-sm text-zinc-500 font-medium capitalize">{user.subscriptionPlanId?.duration?.toLowerCase().replace("_", " ") || user.plan || "N/A"}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-3 text-zinc-500">
                                            <button onClick={() => setEditingUser(user)} className="p-2 hover:bg-white/5 rounded-lg hover:text-[#10B981] transition-all">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => router.push(`/admin/users/${user._id}`)} className="p-2 hover:bg-white/5 rounded-lg hover:text-white transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleToggleStatus(user._id, user.isActive)} className={`p-2 hover:bg-white/5 rounded-lg transition-all ${user.isActive ? "hover:text-red-500" : "hover:text-[#10B981]"}`} title={user.isActive ? "Ban User" : "Unban User"}>
                                                {user.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-zinc-500">
                        Showing {dynamicUsers.length} of {meta.total} users
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={!meta.hasPrev}
                            className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${meta.hasPrev ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!meta.hasNext}
                            className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${meta.hasNext ? "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10" : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {editingUser && <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />}
        </div>
    );
}

function EditUserModal({ user, onClose }: { user: any; onClose: () => void }) {
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [formData, setFormData] = useState({
        isInfluencer: user.isInfluencer || false,
        commissionPercentage: user.commissionPercentage ?? user.percentage ?? user.commission ?? 0,
        maxPayout: user.maxPayout || 0,
        commissionDuration: user.commissionDuration || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser({ id: user._id, body: formData }).unwrap();
            toast.success("User updated successfully");
            onClose();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update user");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#171717] border border-white/5 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Edit User Settings</h3>
                    <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex items-center justify-between bg-white/2 p-4 rounded-xl border border-white/5">
                        <div>
                            <p className="text-sm font-bold text-white">Influencer Status</p>
                            <p className="text-xs text-zinc-500 mt-1">Enable to set custom commissions</p>
                        </div>
                        <button type="button" onClick={() => setFormData((prev) => ({ ...prev, isInfluencer: !prev.isInfluencer }))} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${formData.isInfluencer ? "bg-[#10B981]" : "bg-zinc-800"}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formData.isInfluencer ? "right-1" : "left-1"}`} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Commission Percentage (%)</label>
                            <input
                                type="number"
                                value={formData.commissionPercentage}
                                onChange={(e) => setFormData((prev) => ({ ...prev, commissionPercentage: parseFloat(e.target.value) || 0 }))}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Maximum Payout (CHF)</label>
                            <input
                                type="number"
                                value={formData.maxPayout}
                                onChange={(e) => setFormData((prev) => ({ ...prev, maxPayout: parseFloat(e.target.value) || 0 }))}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Commission Duration (Months)</label>
                            <input
                                type="number"
                                value={formData.commissionDuration}
                                onChange={(e) => setFormData((prev) => ({ ...prev, commissionDuration: parseInt(e.target.value) || 0 }))}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" disabled={isLoading} className="w-full bg-[#10B981] text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-[#0ea5e9] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
