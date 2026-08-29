'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/redux/features/auth/authApi';
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await forgotPassword({ email }).unwrap();
            toast.success(response?.message || "OTP sent to your email!");
            
            // Store email temporarily in sessionStorage for verify OTP step
            sessionStorage.setItem('reset_email', email);
            router.push('/verify-otp');
        } catch (error: any) {
            console.error("Forgot password request failed:", error);
            const errorMessage = error?.data?.message || "Failed to send OTP. Please check your email.";
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
                    Enter your registered email address to receive a one-time password (OTP) for resetting your account password.
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Forgot Password</h2>
                        <p className="text-zinc-500 text-sm text-center px-4">
                            Don&apos;t worry! Enter your email and we&apos;ll send you an OTP code to reset your password.
                        </p>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email Address" 
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
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
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
