"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { currentUser, logOut } from "@/redux/features/auth/authSlice";
import { LogOut, LayoutDashboard } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export default function Header() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const getDashboardUrl = () => {
        switch (user?.role) {
            case "ADMIN":
                return "/admin";
            case "RESTAURANT_OWNER":
                return "/dashboard";
            case "STAFF":
                return "/staff";
            default:
                return null;
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Restaurants", href: "/restaurant" },
        { name: "FAQ", href: "/faq" },
        { name: "Blogs", href: "/blogs" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Logo" width={100} height={100} className="w-24 h-6" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center md:gap-12 lg:gap-18">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link key={link.name} href={link.href} className={`relative text-sm transition-colors ${isActive ? "font-bold text-[#0F172A]" : "font-medium text-[#0F172A]"}`}>
                                {link.name}

                                {isActive && <span className="absolute -top-1 left-0 h-0.5 w-full bg-[#CF0738]" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Section: Desktop Button + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden hover:ring-2 hover:ring-[#CF0738] transition-all">
                                {user.profileImage ? <Image src={getImageUrl(user.profileImage)} alt={user.name} width={40} height={40} className="w-full h-full object-cover" /> : <span className="text-zinc-600 font-bold text-lg">{user.name?.charAt(0).toUpperCase()}</span>}
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-2 border-b border-zinc-100 mb-2">
                                        <p className="text-sm font-bold text-zinc-900 truncate">{user.name}</p>
                                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                                    </div>
                                    {getDashboardUrl() && (
                                        <Link href={getDashboardUrl()!} onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors">
                                            <LayoutDashboard className="w-4 h-4" />
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            dispatch(logOut());
                                            setIsProfileMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="hidden sm:block text-sm font-bold text-[#151C27] hover:text-[#CF0738] transition-colors mr-2">
                                Login
                            </Link>
                            <Link href="/partner" className="hidden sm:block">
                                <button className="rounded-full bg-[#CF0738] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">Become a Partner</button>
                            </Link>
                        </>
                    )}

                    {/* Hamburger Menu Toggle */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#0F172A] hover:bg-zinc-100 rounded-lg transition-colors" aria-label="Toggle Menu">
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-xl animate-in slide-in-from-top-2 duration-300">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className={`text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${pathname === link.href ? "bg-zinc-50 text-[#CF0738]" : "text-[#0F172A] hover:bg-zinc-50"}`}>
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                {getDashboardUrl() && (
                                    <Link href={getDashboardUrl()!} onClick={() => setIsMenuOpen(false)} className="sm:hidden w-full flex items-center justify-center gap-2 text-zinc-700 font-bold py-3 rounded-lg hover:bg-zinc-50 mb-2">
                                        <LayoutDashboard className="w-5 h-5" />
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        dispatch(logOut());
                                        setIsMenuOpen(false);
                                    }}
                                    className="sm:hidden w-full flex items-center justify-center gap-2 text-red-600 font-bold py-3 rounded-lg hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/partner" onClick={() => setIsMenuOpen(false)} className="sm:hidden block w-full text-center bg-[#CF0738] text-white font-bold py-3 rounded-lg">
                                Become a Partner
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
