import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Taste() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#151C27] mb-2 tracking-tight">Tasting Notes</h2>
                    <p className="text-[#36654D] text-sm sm:text-base">Stories from the culinary world</p>
                </div>
                <Link href="/blogs" className="flex items-center gap-2 text-[#36654D] hover:text-[#0D9733] font-semibold text-sm sm:text-base transition-colors group">
                    Read all articles
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Asymmetrical Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                {/* CARD 1: Turquoise Solid Card (Row 1, span 3) */}
                <div className="lg:col-span-3 bg-[#00C2C2] rounded-[20px] p-8 flex flex-col justify-between min-h-95 shadow-sm hover:shadow-md transition-shadow">
                    <div></div>
                    <div className="space-y-4">
                        <h3 className="text-[28px] font-bold text-white leading-tight">Discover the Best Food Experiences Around You</h3>
                        <p className="text-white/85 text-[13px] leading-relaxed">From hidden local gems to trending restaurants, explore curated food stories, honest reviews, and must-try dishes updated daily.</p>
                    </div>
                </div>

                {/* CARD 2: Light Gray / Burger Card (Row 1, span 3) */}
                <div className="lg:col-span-3 bg-[#E5E9F0] rounded-[20px] p-6 flex flex-col justify-between min-h-95 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full aspect-4/3 rounded-[14px] overflow-hidden mb-4">
                        <Image src="/berger.png" alt="Trending burger" fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-[#151C27]">Trending This Week</h3>
                        <p className="text-zinc-600 text-[12px] leading-relaxed">Crispy buns, juicy patties, melted cheese, and secret sauces — here are the top burger spots everyone is talking about this week.</p>
                    </div>
                </div>

                {/* CARD 3: Mint Green Card (Row 1, span 6) */}
                <div className="md:col-span-2 lg:col-span-6 bg-[#D1FFF3] rounded-[20px] p-8 flex flex-col justify-center gap-6 min-h-95 shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <h3 className="text-[32px] font-bold text-[#151C27] leading-tight">Best Brunch Places for Weekend Lovers</h3>
                        <p className="text-[#36654D]/90 text-[15px] max-w-xl leading-relaxed">Looking for the perfect brunch vibe? Discover cozy cafés, signature coffee spots, and Instagram-worthy breakfast dishes.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer">
                        <svg className="w-6 h-6 text-[#151C27]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>

                {/* CARD 4: White Card / Sandwich (Row 2, span 3) */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-[20px] p-6 flex flex-col justify-between min-h-95 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full aspect-4/3 rounded-[14px] overflow-hidden mb-4">
                        <Image src="/sand.png" alt="Street Food Sandwich" fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-[#151C27]">Street Food That Deserves the Hype</h3>
                        <p className="text-zinc-500 text-[12px] leading-relaxed">From spicy late-night snacks to authentic local flavors, these street food spots are dominating the food scene right now.</p>
                    </div>
                </div>

                {/* CARD 5: Background Image Card / Deal (Row 2, span 6) */}
                <div className="md:col-span-2 lg:col-span-6 relative rounded-[20px] p-8 flex flex-col justify-center gap-6 min-h-95 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <Image src="/deals.png" alt="Restaurant interior" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Centered Content */}
                    <div className="relative z-10 space-y-3">
                        <h3 className="text-[32px] font-bold text-white leading-tight">How to Find the Best Restaurant Deals</h3>
                        <p className="text-white/80 text-[15px] max-w-xl leading-relaxed">Crispy buns, juicy patties, melted cheese, and secret sauces — here are the top burger spots everyone is talking about this week.</p>
                    </div>

                    <div className="relative z-10 w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>

                {/* CARD 6: Navy Blue Solid Card (Row 2, span 3) */}
                <div className="lg:col-span-3 bg-[#002D62] rounded-[20px] p-8 flex flex-col justify-center min-h-95 shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                        <h3 className="text-[28px] font-bold text-white leading-tight">Top 5 Foods You Must Try This Month</h3>
                        <p className="text-white/80 text-[13px] leading-relaxed">A curated list of trending dishes that food lovers should not miss.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
