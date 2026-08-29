'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const savedEmail = sessionStorage.getItem('reset_email');
        const savedToken = sessionStorage.getItem('reset_token');
        if (savedEmail) setEmail(savedEmail);
        if (savedToken) setToken(savedToken);
    }, []);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const payload = {
                token,
                newPassword,
            };

            const response = await resetPassword(payload).unwrap();
            toast.success(response?.message || "Password reset successfully!");

            // Clean up session storage
            sessionStorage.removeItem('reset_email');
            sessionStorage.removeItem('reset_token');

            router.push('/login');
        } catch (error: any) {
            console.error("Reset password failed:", error);
            const errorMessage = error?.data?.message || "Failed to reset password. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
            {/* Header / Brand */}
            <div className="text-center mb-12">
                <Link href="/">
                    <Image src="/logo.svg" alt="Vibez Logo" width={120} height={40} className="mx-auto mb-6" />
                </Link>
                <p className="text-zinc-500 max-w-md mx-auto">
                    Create a new password for your account to restore access.
                </p>
            </div>

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-zinc-200 border border-zinc-100 overflow-hidden transition-all duration-500">
                <div className="p-8 md:p-10 transition-colors duration-500 bg-[#013622]/5">
                    
                    {/* Icon Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 shadow-inner"
                            style={{ backgroundColor: '#013622' }}
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Reset Password</h2>
                        <p className="text-zinc-500 text-sm text-center px-4">
                            Please set your new password below.
                        </p>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleReset} className="space-y-4">
                        <div>
                            <input 
                                type="password" 
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password" 
                                required
                                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{ '--tw-ring-color': '#013622' } as any}
                            />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password" 
                                required
                                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{ '--tw-ring-color': '#013622' } as any}
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-[0.98] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#013622' }}
                        >
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-zinc-400">
                            Remember your password?{' '}
                            <Link href="/login" className="font-bold text-[#013622] hover:underline">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Back to Home Link */}
            <Link href="/" className="mt-8 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /></svg>
                Back to Home
            </Link>
        </div>
    );
}
