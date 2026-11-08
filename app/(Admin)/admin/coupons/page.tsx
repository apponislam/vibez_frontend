"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Loader2, X, Ticket, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
    useGetCouponsQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    ICoupon,
    ISelectedPlan,
} from "@/redux/features/coupon/couponApi";
import { useGetSubscriptionPlansQuery } from "@/redux/features/admin/subscriptionApi";

interface IApiError {
    data?: {
        message?: string;
    };
    message?: string;
}

export default function AdminCouponsPage() {
    const { data: couponsRes, isLoading: isCouponsLoading } = useGetCouponsQuery();
    const coupons = couponsRes?.data || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<ICoupon | null>(null);
    const [deletingCoupon, setDeletingCoupon] = useState<ICoupon | null>(null);

    const openCreateModal = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const openEditModal = (coupon: ICoupon) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">Coupons Management</h1>
                    <p className="text-zinc-400 text-sm mt-1">Create and manage Stripe discount coupons</p>
                </div>
                <button onClick={openCreateModal} className="bg-[#1447E6] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0c2f99] transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Coupon
                </button>
            </div>

            <div className="bg-[#171717] rounded-[10px] border border-white/5 overflow-hidden shadow-xl">
                {isCouponsLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-[#1447E6]" />
                    </div>
                ) : (
                    <table className="w-full text-left text-sm text-zinc-300">
                        <thead className="bg-white/5 text-xs uppercase font-semibold text-zinc-400 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Coupon ID / Name</th>
                                <th className="px-6 py-4">Discount</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Redeemed</th>
                                <th className="px-6 py-4">Status / Default</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {coupons.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-zinc-500">
                                        No coupons found.
                                    </td>
                                </tr>
                            ) : (
                                coupons.map((c: ICoupon) => (
                                    <tr key={c._id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white flex items-center gap-2">
                                                <Ticket className="w-4 h-4 text-[#1447E6]" />
                                                {c.couponId}
                                            </div>
                                            <div className="text-xs text-zinc-500 mt-0.5">{c.name || "No Name"}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{c.percentOff ? `${c.percentOff}% off` : `${((c.amountOff || 0) / 100).toFixed(2)} ${c.currency?.toUpperCase() || "CHF"} off`}</td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize">{c.duration}</span>
                                            {c.duration === "repeating" && <span className="text-zinc-500 text-xs ml-1">({c.durationInMonths} mos)</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {c.timesRedeemed} {c.maxRedemptions ? `/ ${c.maxRedemptions}` : ""}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {c.isActive ? (
                                                    <span className="w-fit bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Active</span>
                                                ) : (
                                                    <span className="w-fit bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Inactive</span>
                                                )}
                                                {c.isDefault && (
                                                    <span className="w-fit bg-[#1447E6]/10 text-[#1447E6] border border-[#1447E6]/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Default Referral</span>
                                                )}
                                                {c.isDirectUse ? (
                                                    <span className="w-fit bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Direct Use: Yes</span>
                                                ) : (
                                                    <span className="w-fit bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Direct Use: No</span>
                                                )}
                                                {c.selectedPlans && c.selectedPlans.length > 0 ? (
                                                    <span className="w-fit bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                                                        Plans: {c.selectedPlans.map((p: string | ISelectedPlan) => (typeof p === "object" ? p?.name : p)).join(", ")}
                                                    </span>
                                                ) : (
                                                    <span className="w-fit bg-white/5 text-zinc-400 border border-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                                                        All Plans
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <ToggleDirectUseButton coupon={c} />
                                                <button onClick={() => openEditModal(c)} className="text-zinc-400 hover:text-white transition-colors" title="Edit Coupon">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setDeletingCoupon(c)} className="text-zinc-400 hover:text-red-500 transition-colors" title="Delete Coupon">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && <CouponModal onClose={() => setIsModalOpen(false)} editingCoupon={editingCoupon} />}

            {deletingCoupon && <DeleteCouponModal coupon={deletingCoupon} onClose={() => setDeletingCoupon(null)} />}
        </div>
    );
}

function ToggleDirectUseButton({ coupon }: { coupon: ICoupon }) {
    const [updateCoupon, { isLoading }] = useUpdateCouponMutation();

    const handleToggle = async () => {
        try {
            await updateCoupon({
                id: coupon._id,
                data: { isDirectUse: !coupon.isDirectUse },
            }).unwrap();
            toast.success(`Coupon marked as ${!coupon.isDirectUse ? "Direct Use" : "Standard"}`);
        } catch (error: unknown) {
            console.error("Failed to update direct use status:", error);
            const err = error as IApiError;
            toast.error(err?.data?.message || err?.message || "Failed to update direct use status");
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                coupon.isDirectUse ? "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30" : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-zinc-200"
            }`}
            title="Toggle Direct Use Status"
        >
            {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
                <>
                    <span className={`w-2 h-2 rounded-full ${coupon.isDirectUse ? "bg-purple-400" : "bg-zinc-500"}`} />
                    <span>{coupon.isDirectUse ? "Direct" : "Set Direct"}</span>
                </>
            )}
        </button>
    );
}

function DeleteCouponModal({ coupon, onClose }: { coupon: ICoupon; onClose: () => void }) {
    const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();

    const handleConfirm = async () => {
        try {
            await deleteCoupon(coupon._id).unwrap();
            toast.success("Coupon deleted successfully!");
            onClose();
        } catch (error: unknown) {
            console.error("Coupon deletion failed:", error);
            const err = error as IApiError;
            toast.error(err?.data?.message || err?.message || "Failed to delete coupon.");
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Delete Coupon?</h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Are you sure you want to delete <strong className="text-white font-semibold">&quot;{coupon.couponId}&quot;</strong>? This will permanently remove it from your database and Stripe.
                    </p>

                    <div className="flex items-center gap-4">
                        <button onClick={onClose} disabled={isLoading} className="flex-1 py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all disabled:opacity-50">
                            Cancel
                        </button>
                        <button onClick={handleConfirm} disabled={isLoading} className="flex-1 py-3.5 px-4 bg-[#CF0738] hover:bg-[#b00630] text-white font-bold rounded-xl shadow-lg shadow-[#CF0738]/20 transition-all disabled:opacity-50 flex items-center justify-center">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CouponModal({ onClose, editingCoupon }: { onClose: () => void; editingCoupon: ICoupon | null }) {
    const isEditing = !!editingCoupon;

    const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
    const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();
    const { data: plansRes } = useGetSubscriptionPlansQuery();
    const plans: ISelectedPlan[] = plansRes?.data || [];

    const [formData, setFormData] = useState({
        couponId: editingCoupon?.couponId || "",
        name: editingCoupon?.name || "",
        discountType: editingCoupon?.percentOff ? "percent" : editingCoupon?.amountOff ? "amount" : "percent",
        discountValue: editingCoupon?.percentOff || (editingCoupon?.amountOff ? editingCoupon.amountOff / 100 : ""),
        currency: editingCoupon?.currency || "chf",
        duration: editingCoupon?.duration || "once",
        durationInMonths: editingCoupon?.durationInMonths || "",
        maxRedemptions: editingCoupon?.maxRedemptions || "",
        isDefault: Boolean(editingCoupon?.isDefault),
        selectedPlans: Array.isArray(editingCoupon?.selectedPlans)
            ? editingCoupon.selectedPlans.map((p: string | ISelectedPlan) => (typeof p === "string" ? p : p?._id)).filter((id): id is string => Boolean(id))
            : [] as string[],
        isDirectUse: Boolean(editingCoupon?.isDirectUse),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handlePlanCheckboxChange = (planId: string) => {
        setFormData((prev) => {
            const current = prev.selectedPlans || [];
            const exists = current.includes(planId);
            const updated = exists ? current.filter((id) => id !== planId) : [...current, planId];
            return { ...prev, selectedPlans: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing && editingCoupon) {
                // Edit mode
                const updatePayload: Partial<ICoupon> = {
                    name: formData.name,
                    isDefault: Boolean(formData.isDefault),
                    selectedPlans: formData.selectedPlans,
                    isDirectUse: Boolean(formData.isDirectUse),
                };
                await updateCoupon({ id: editingCoupon._id, data: updatePayload }).unwrap();
                toast.success("Coupon updated successfully");
            } else {
                // Create mode
                const payload: Partial<ICoupon> & { discountType?: string; discountValue?: number | string } = {
                    couponId: formData.couponId.trim().toUpperCase(),
                    name: formData.name,
                    duration: formData.duration as "once" | "repeating" | "forever",
                    isDefault: Boolean(formData.isDefault),
                    selectedPlans: formData.selectedPlans,
                    isDirectUse: Boolean(formData.isDirectUse),
                };

                if (formData.discountType === "percent") {
                    payload.percentOff = Number(formData.discountValue);
                } else {
                    payload.amountOff = Number(formData.discountValue) * 100; // convert to cents
                    payload.currency = formData.currency;
                }

                if (formData.duration === "repeating") {
                    payload.durationInMonths = Number(formData.durationInMonths);
                }

                if (formData.maxRedemptions) {
                    payload.maxRedemptions = Number(formData.maxRedemptions);
                }

                await createCoupon(payload).unwrap();
                toast.success("Coupon created successfully");
            }
            onClose();
        } catch (error: unknown) {
            const err = error as IApiError;
            toast.error(err?.data?.message || err?.message || `Failed to ${isEditing ? "update" : "create"} coupon`);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white">{isEditing ? "Edit Coupon" : "Create New Coupon"}</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Coupon ID / Code</label>
                            <input
                                required
                                name="couponId"
                                value={formData.couponId}
                                onChange={handleChange}
                                disabled={isEditing}
                                placeholder="e.g. SUMMER50"
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6] disabled:opacity-50"
                            />
                            {isEditing && <p className="text-[10px] text-zinc-500 mt-1">Core Stripe fields cannot be changed after creation.</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Descriptive Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. 50% Off Summer Sale" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]" />
                        </div>

                        {!isEditing && (
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Discount Type</label>
                                    <select name="discountType" value={formData.discountType} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]">
                                        <option value="percent">Percentage (%)</option>
                                        <option value="amount">Fixed Amount</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Value {formData.discountType === "percent" ? "(%)" : "(CHF)"}</label>
                                    <input
                                        type="number"
                                        required
                                        name="discountValue"
                                        value={formData.discountValue}
                                        onChange={handleChange}
                                        placeholder={formData.discountType === "percent" ? "e.g. 15" : "e.g. 5.00"}
                                        min="0"
                                        step={formData.discountType === "percent" ? "1" : "0.01"}
                                        max={formData.discountType === "percent" ? "100" : undefined}
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Duration</label>
                                    <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]">
                                        <option value="once">Once</option>
                                        <option value="repeating">Repeating</option>
                                        <option value="forever">Forever</option>
                                    </select>
                                </div>

                                {formData.duration === "repeating" && (
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Duration in Months</label>
                                        <input
                                            type="number"
                                            required
                                            name="durationInMonths"
                                            value={formData.durationInMonths}
                                            onChange={handleChange}
                                            placeholder="e.g. 3"
                                            min="1"
                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Max Redemptions</label>
                                    <input
                                        type="number"
                                        name="maxRedemptions"
                                        value={formData.maxRedemptions}
                                        onChange={handleChange}
                                        placeholder="Optional limit"
                                        min="1"
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1447E6]"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="border-t border-white/5 pt-4 mt-2 space-y-4">
                            {/* isDefault checkbox */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded bg-[#0A0A0A] border border-white/20 text-[#1447E6] focus:ring-[#1447E6] focus:ring-offset-[#171717]"
                                />
                                <div>
                                    <div className="text-sm font-bold text-white group-hover:text-[#1447E6] transition-colors">Default Referral Coupon</div>
                                    <div className="text-xs text-zinc-500">Automatically apply this to users signing up via influencer referrals.</div>
                                </div>
                            </label>

                            {/* isDirectUse checkbox */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isDirectUse"
                                    checked={formData.isDirectUse}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded bg-[#0A0A0A] border border-white/20 text-purple-500 focus:ring-purple-500 focus:ring-offset-[#171717]"
                                />
                                <div>
                                    <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Direct Use Coupon</div>
                                    <div className="text-xs text-zinc-500">Allow this coupon to be used directly at checkout without referral restrictions.</div>
                                </div>
                            </label>

                            {/* Multi-select Subscription Plans restriction */}
                            <div className="p-3 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Plan Restriction
                                    </label>
                                    {formData.selectedPlans.length > 0 ? (
                                        <button
                                            type="button"
                                            onClick={() => setFormData((prev) => ({ ...prev, selectedPlans: [] }))}
                                            className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
                                        >
                                            Clear (Apply to All Plans)
                                        </button>
                                    ) : (
                                        <span className="text-[10px] text-emerald-400 font-semibold">Valid on All Plans</span>
                                    )}
                                </div>
                                <p className="text-[11px] text-zinc-500">
                                    Leave unselected to allow on all plans, or check specific plans to restrict:
                                </p>
                                {plans.length === 0 ? (
                                    <p className="text-xs text-zinc-500">No subscription plans found.</p>
                                ) : (
                                    <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                                        {plans.map((p: ISelectedPlan) => (
                                            <label key={p._id} className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 hover:text-white">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.selectedPlans.includes(p._id)}
                                                    onChange={() => handlePlanCheckboxChange(p._id)}
                                                    className="w-4 h-4 rounded bg-[#171717] border-white/20 text-[#1447E6] focus:ring-[#1447E6]"
                                                />
                                                <span>{p.name} {p.price ? `(CHF ${p.price})` : ""}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6 mt-6">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={isCreating || isUpdating} className="bg-[#1447E6] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0c2f99] transition-all flex items-center gap-2 disabled:opacity-50">
                            {isCreating || isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {isEditing ? "Save Changes" : "Create Coupon"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
