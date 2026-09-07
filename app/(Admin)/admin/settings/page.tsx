"use client";

import React, { useState, useEffect } from "react";
import { Settings, Bell, Save, Settings2 } from "lucide-react";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "../../../../redux/features/dashboard/dashboardApi";
import { toast } from "sonner";

export default function PlatformSettings() {
    const { data: settingsData, isLoading } = useGetSettingsQuery(undefined);
    const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

    const [settings, setSettings] = useState({
        defaultMaxPayout: 100,
        defaultCommisionPercentage: 10,
        defaultCommissionDuration: 12,
        emailNotification: true,
        pushNotification: true,
        allowAutoApproveNewResturant: false,
        allowAutoApproveResturantDeals: false,
    });

    useEffect(() => {
        if (settingsData?.data) {
            setSettings({
                defaultMaxPayout: settingsData.data.defaultMaxPayout ?? 100,
                defaultCommisionPercentage: settingsData.data.defaultCommisionPercentage ?? 10,
                defaultCommissionDuration: settingsData.data.defaultCommissionDuration ?? 12,
                emailNotification: settingsData.data.emailNotification ?? true,
                pushNotification: settingsData.data.pushNotification ?? true,
                allowAutoApproveNewResturant: settingsData.data.allowAutoApproveNewResturant ?? false,
                allowAutoApproveResturantDeals: settingsData.data.allowAutoApproveResturantDeals ?? false,
            });
        }
    }, [settingsData]);

    const handleSave = async () => {
        try {
            await updateSettings(settings).unwrap();
            toast.success("Settings updated successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update settings");
        }
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
    };

    const handleChange = (key: keyof typeof settings, value: number) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <p className="text-zinc-400">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings</h1>
                <p className="text-zinc-500 text-sm mt-1">Configure global platform settings and preferences</p>
            </div>

            <div className="space-y-6">
                {/* Global Referral Settings */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <Settings2 className="w-5 h-5 text-zinc-400" />
                        <h3 className="text-base font-bold text-white">Global Referral Settings</h3>
                    </div>

                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-zinc-400">Default Commission Percentage</label>
                                <span className="text-sm font-bold text-white">{settings.defaultCommisionPercentage}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={settings.defaultCommisionPercentage}
                                onChange={(e) => handleChange("defaultCommisionPercentage", parseInt(e.target.value))}
                                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                                style={{
                                    background: `linear-gradient(to right, #10B981 ${settings.defaultCommisionPercentage}%, #27272a ${settings.defaultCommisionPercentage}%)`,
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Default Commission Duration (Months)</label>
                                <input
                                    type="number"
                                    value={settings.defaultCommissionDuration}
                                    onChange={(e) => handleChange("defaultCommissionDuration", parseInt(e.target.value) || 0)}
                                    placeholder="e.g. 12"
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Maximum Total Payout (CHF)</label>
                                <input
                                    type="number"
                                    value={settings.defaultMaxPayout}
                                    onChange={(e) => handleChange("defaultMaxPayout", parseInt(e.target.value) || 0)}
                                    placeholder="e.g. 1000"
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Restaurant & Deal Management */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-5 h-5 text-purple-500" />
                        <h3 className="text-base font-bold text-white">Restaurant & Deal Management</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: "allowAutoApproveNewResturant" as const, label: "Auto-approve New Restaurants", desc: "Automatically approve restaurant applications without manual review" },
                            { id: "allowAutoApproveResturantDeals" as const, label: "Auto-approve Restaurant Deals", desc: "Allow restaurants to publish deals immediately without admin approval" },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/2 last:border-0">
                                <div>
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                                </div>
                                <button onClick={() => toggleSetting(item.id)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings[item.id] ? "bg-purple-500" : "bg-zinc-800"}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id] ? "right-1" : "left-1"}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Notifications */}
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5 text-orange-500" />
                        <h3 className="text-base font-bold text-white">Platform Notifications</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: "emailNotification" as const, label: "Email Notifications", desc: "Receive system alerts and updates via email" },
                            { id: "pushNotification" as const, label: "Push Notifications", desc: "Receive real-time push notifications in dashboard" },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/2 last:border-0">
                                <div>
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                                </div>
                                <button onClick={() => toggleSetting(item.id)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings[item.id] ? "bg-orange-500" : "bg-zinc-800"}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id] ? "right-1" : "left-1"}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-12">
                <button onClick={handleSave} disabled={isUpdating} className="flex items-center gap-2 px-10 py-4 rounded-xl bg-[#10B981] text-white text-sm font-bold hover:bg-[#0da673] transition-all shadow-xl shadow-[#10B981]/10 disabled:opacity-50">
                    <Save className="w-5 h-5" />
                    {isUpdating ? "Saving..." : "Save All Settings"}
                </button>
            </div>
        </div>
    );
}
