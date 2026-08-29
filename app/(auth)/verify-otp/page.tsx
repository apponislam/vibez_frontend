'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useVerifyOtpMutation, useResendOtpMutation } from '@/redux/features/auth/authApi';
import { toast } from "sonner";

export default function VerifyOtpPage() {
    const router = useRouter();
    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    useEffect(() => {
        const savedEmail = sessionStorage.getItem('reset_email');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto-focus next input
        if (element.value && element.nextElementSibling) {
            (element.nextElementSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const previousInput = (e.currentTarget.previousElementSibling as HTMLInputElement);
            if (previousInput) {
                previousInput.focus();
            }
        }
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length < 6) {
            toast.error("Please enter the full 6-digit OTP code.");
            return;
        }

        try {
            const response = await verifyOtp({ email, otp: otpString }).unwrap();
            toast.success(response?.message || "OTP verified successfully!");

            // Store reset token from response.data.token
            const resetToken = response?.data?.token || response?.data?.resetToken;
            if (resetToken) {
                sessionStorage.setItem('reset_token', resetToken);
            }
            router.push('/reset-password');
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            const errorMessage = error?.data?.message || "Invalid OTP code. Please try again.";
            toast.error(errorMessage);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error("Email not found. Please start from Forgot Password.");
            router.push('/forgot-password');
            return;
        }

        try {
            const response = await resendOtp({ email }).unwrap();
            toast.success(response?.message || "OTP sent successfully to your email!");
        } catch (error: any) {
            console.error("Resend OTP failed:", error);
            const errorMessage = error?.data?.message || "Failed to resend OTP.";
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
                    Verify your identity by entering the 6-digit code sent to your email.
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Verify OTP</h2>
                        <p className="text-zinc-500 text-sm text-center px-2">
                            Enter the 6-digit verification code sent to <br />
                            <span className="font-semibold text-zinc-800">{email || 'your email'}</span>
                        </p>
                    </div>

                    {/* Email edit option */}
                    <div className="mb-4 text-center">
                        <input 
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-xl py-2 px-4 text-xs text-center focus:outline-none focus:ring-1 transition-all mb-4"
                            style={{ '--tw-ring-color': '#013622' } as any}
                        />
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onFocus={(e) => e.target.select()}
                                    className="w-12 h-14 bg-white border border-zinc-200 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-2 transition-all"
                                    style={{ '--tw-ring-color': '#013622' } as any}
                                />
                            ))}
                        </div>

                        <button 
                            type="submit"
                            disabled={isVerifying}
                            className="w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#013622' }}
                        >
                            {isVerifying ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>

                    {/* Resend OTP */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-zinc-500">
                            Didn&apos;t receive code?{' '}
                            <button 
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="font-bold text-[#013622] hover:underline disabled:opacity-50"
                            >
                                {isResending ? 'Resending...' : 'Resend Code'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Back Link */}
            <Link href="/forgot-password" className="mt-8 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /></svg>
                Back to Forgot Password
            </Link>
        </div>
    );
}
