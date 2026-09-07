"use client";

import React from "react";

const reviews = [
    {
        id: 1,
        name: "Sarah M.",
        role: "Berlin Explorer",
        text: "NeoTaste changed how I explore Berlin. Found so many hidden gems and saved nearly 100CHF in my first month!",
        rating: 5,
        avatar: "SM",
        avatarBg: "from-[#CF0738] to-[#CF0738]/70",
    },
    {
        id: 2,
        name: "David L.",
        role: "Cologne Foodie",
        text: "As a student, this app is a lifesaver. High-quality food for a fraction of the price. The interface is super clean too.",
        rating: 5,
        avatar: "DL",
        avatarBg: "from-[#E8541A] to-[#E8541A]/70",
    },
    {
        id: 3,
        name: "Emma J.",
        role: "Hamburg Gourmet",
        text: "The best way to try new restaurants. We use it every Friday for our date nights. Highly recommended!",
        rating: 5,
        avatar: "EJ",
        avatarBg: "from-[#CF0738] to-[#CF0738]/70",
    },
    {
        id: 4,
        name: "Liam K.",
        role: "Munich Trendsetter",
        text: "Incredible deals every week! I discovered 3 new favourite spots just this month. Game changer for foodies.",
        rating: 5,
        avatar: "LK",
        avatarBg: "from-[#A8042B] to-[#A8042B]/70",
    },
    {
        id: 5,
        name: "Mia R.",
        role: "Frankfurt Bites",
        text: "The app is so intuitive. Booking a table AND getting a discount at the same time? Yes please!",
        rating: 5,
        avatar: "MR",
        avatarBg: "from-[#CF0738] to-[#CF0738]/70",
    },
    {
        id: 6,
        name: "Jonas W.",
        role: "Stuttgart Eats",
        text: "Been using it for 6 months. Saved over 200CHF and tried more than 20 new places. Absolutely love it.",
        rating: 5,
        avatar: "JW",
        avatarBg: "from-[#E8541A] to-[#E8541A]/70",
    },
];

const StarPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarRating({ count, filled = "text-green-500", empty = "text-gray-300", size = "w-4 h-4" }: { count: number; filled?: string; empty?: string; size?: string }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`${size} ${i < count ? filled : empty}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d={StarPath} />
                </svg>
            ))}
        </div>
    );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
    return (
        <div className="min-w-65 max-w-65 md:min-w-75 md:max-w-75 mx-2 md:mx-2.5 bg-[#FAE6EB] rounded-[20px] p-5 md:p-6 flex flex-col shrink-0">
            {/* Stars */}
            <div className="mb-3">
                <StarRating count={review.rating} filled="text-[#CF0738]" />
            </div>

            {/* Review text */}
            <p className="text-[#151C27] text-sm leading-relaxed italic mb-5 flex-1">&ldquo;{review.text}&rdquo;</p>

            {/* Author */}
            <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.avatarBg} flex items-center justify-center text-white font-bold text-xs shrink-0`}>{review.avatar}</div>
                <div>
                    <p className="text-[#151C27] font-bold text-[13px] leading-none mb-0.5">{review.name}</p>
                    <p className="text-gray-400 text-[11px]">{review.role}</p>
                </div>
            </div>
        </div>
    );
}

export default function Review() {
    const doubled = [...reviews, ...reviews];

    return (
        <section className="overflow-hidden">
            {/* ── Mobile / Tablet: stacked layout ── */}
            <div className="block lg:hidden px-4 md:px-8 mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#151C27] leading-tight mb-6">Our User Review</h2>

                {/* Google Play — mobile */}
                <div className="flex items-center gap-3 mb-4">
                    <svg width="36" height="36" viewBox="0 0 48 48" className="shrink-0">
                        <defs>
                            <linearGradient id="m-pg1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00C6FF" />
                                <stop offset="100%" stopColor="#0072FF" />
                            </linearGradient>
                            <linearGradient id="m-pg2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFE000" />
                                <stop offset="100%" stopColor="#FFAA00" />
                            </linearGradient>
                            <linearGradient id="m-pg3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF3A44" />
                                <stop offset="100%" stopColor="#C31162" />
                            </linearGradient>
                            <linearGradient id="m-pg4" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#32A071" />
                                <stop offset="100%" stopColor="#00F076" />
                            </linearGradient>
                        </defs>
                        <path d="M7.2 4C6 4.7 5.2 6 5.2 7.6v32.8c0 1.6.8 2.9 2 3.6l.2.1 18.4-18.4v-.4L7.2 4z" fill="url(#m-pg1)" />
                        <path d="M31.8 31.4l-6.1-6.1v-.5l6.1-6.1.1.1 7.3 4.1c2.1 1.2 2.1 3.1 0 4.3l-7.4 4.2z" fill="url(#m-pg2)" />
                        <path d="M32 31.3l-6.3-6.3L7.2 43.6c.7.7 1.8.8 3.1.1L32 31.3" fill="url(#m-pg3)" />
                        <path d="M32 18.7L10.3 6.4C9 5.7 7.9 5.8 7.2 6.5l18.5 18.5L32 18.7z" fill="url(#m-pg4)" />
                    </svg>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-[#151C27] leading-none">4.6</span>
                        <span className="text-gray-400 text-sm">/5 rating</span>
                        <StarRating count={5} size="w-4 h-4" filled="text-[#0D9733]" />
                    </div>
                </div>

                {/* App Store — mobile */}
                <div className="flex items-center gap-3">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="#151C27" className="shrink-0">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-[#151C27] leading-none">4.2</span>
                        <span className="text-gray-400 text-sm">/5 rating</span>
                        <StarRating count={4} size="w-4 h-4" filled="text-[#0D9733]" />
                    </div>
                </div>
            </div>

            {/* ── Main Row ── */}
            <div className="flex items-center min-h-65">
                {/* ── LEFT PANEL — desktop only (1/4) ── */}
                <div className="hidden lg:block w-1/4 shrink-0 pl-4 md:pl-10 lg:pl-12 pr-8">
                    <h2 className="text-2xl md:text-3xl lg:text-[42px] font-semibold text-[#151C27] leading-tight mb-7">Our User Review</h2>

                    {/* Google Play */}
                    <div className="flex items-center gap-4 mb-6">
                        <svg width="44" height="44" viewBox="0 0 48 48" className="shrink-0">
                            <defs>
                                <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00C6FF" />
                                    <stop offset="100%" stopColor="#0072FF" />
                                </linearGradient>
                                <linearGradient id="pg2" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFE000" />
                                    <stop offset="100%" stopColor="#FFAA00" />
                                </linearGradient>
                                <linearGradient id="pg3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FF3A44" />
                                    <stop offset="100%" stopColor="#C31162" />
                                </linearGradient>
                                <linearGradient id="pg4" x1="100%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#32A071" />
                                    <stop offset="100%" stopColor="#00F076" />
                                </linearGradient>
                            </defs>
                            <path d="M7.2 4C6 4.7 5.2 6 5.2 7.6v32.8c0 1.6.8 2.9 2 3.6l.2.1 18.4-18.4v-.4L7.2 4z" fill="url(#pg1)" />
                            <path d="M31.8 31.4l-6.1-6.1v-.5l6.1-6.1.1.1 7.3 4.1c2.1 1.2 2.1 3.1 0 4.3l-7.4 4.2z" fill="url(#pg2)" />
                            <path d="M32 31.3l-6.3-6.3L7.2 43.6c.7.7 1.8.8 3.1.1L32 31.3" fill="url(#pg3)" />
                            <path d="M32 18.7L10.3 6.4C9 5.7 7.9 5.8 7.2 6.5l18.5 18.5L32 18.7z" fill="url(#pg4)" />
                        </svg>
                        {/* rating number + stars INLINE */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[32px] font-extrabold text-[#151C27] leading-none">4.6</span>
                            <span className="text-gray-400 text-[15px]">/5 rating</span>
                            <StarRating count={5} size="w-5 h-5" filled="text-[#0D9733]" />
                        </div>
                    </div>

                    {/* App Store */}
                    <div className="flex items-center gap-4">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="#151C27" className="shrink-0">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        {/* rating number + stars INLINE */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[32px] font-extrabold text-[#151C27] leading-none">4.2</span>
                            <span className="text-gray-400 text-[15px]">/5 rating</span>
                            <StarRating count={4} size="w-5 h-5" filled="text-[#0D9733]" />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT MARQUEE ── */}
                <div className="flex-1 overflow-hidden relative">
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    {/* Scrolling track */}
                    <div className="review-marquee-track flex items-stretch w-max">
                        {doubled.map((review, idx) => (
                            <ReviewCard key={`${review.id}-${idx}`} review={review} />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes reviewMarquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .review-marquee-track {
                    animation: reviewMarquee 28s linear infinite;
                }
                .review-marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
