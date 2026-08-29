'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    React.useEffect(() => {
        const savedEmail = localStorage.getItem('vibez_saved_email');
        const savedPassword = localStorage.getItem('vibez_saved_password');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await login({ email, password }).unwrap();
            
            if (rememberMe) {
                localStorage.setItem('vibez_saved_email', email);
                localStorage.setItem('vibez_saved_password', password);
            } else {
                localStorage.removeItem('vibez_saved_email');
                localStorage.removeItem('vibez_saved_password');
            }
            
            if (response?.data?.user && response?.data?.accessToken) {
                dispatch(setUser({
                    user: response.data.user,
                    token: response.data.accessToken
                }));
            }

            if (response?.data?.user) {
                const userRole = response.data.user.role;
                if (userRole === 'RESTAURANT_OWNER') {
                    router.push('/dashboard');
                } else if (userRole === 'ADMIN') {
                    router.push('/admin');
                } else if (userRole === 'STAFF') {
                    router.push('/staff');
                } else if (userRole === 'USER') {
                    router.push('/');
                } else {
                    router.push('/');
                }
            }

            toast.success("Login successful!");
        } catch (error: any) {
            console.error("Login failed:", error);
            const errorMessage = error?.data?.message || "Login failed. Please check your credentials.";
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
                    A modern dining spot serving bold flavors and fusion dishes, perfect for casual hangouts and memorable meals.
                </p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-zinc-200 border border-zinc-100 overflow-hidden transition-all duration-500">
                <div className="p-8 md:p-10 transition-colors duration-500 bg-[#013622]/5">
                    
                    {/* Icon Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 shadow-inner"
                            style={{ backgroundColor: '#013622' }}
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Login</h2>
                        <p className="text-zinc-500 text-sm text-center px-6">
                            Welcome back! Please login to your account.
                        </p>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address" 
                                required
                                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{ '--tw-ring-color': '#013622' } as any}
                            />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" 
                                required
                                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{ '--tw-ring-color': '#013622' } as any}
                            />
                        </div>
                        
                        <div className="flex justify-between items-center text-xs font-medium px-2">
                            <label className="flex items-center gap-2 cursor-pointer text-zinc-500">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="rounded-md border-zinc-200 text-[#013622]" 
                                />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className="text-zinc-400 hover:text-zinc-600">Forgot Password?</Link>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-[0.98] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#013622' }}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-zinc-400">
                            By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
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
