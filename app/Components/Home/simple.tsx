import React from "react";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Invite Friends",
        description: "Share your unique link via text, email, or social media.",
        image: "/friends.png",
    },
    {
        number: "02",
        title: "They Dine",
        description: "They get $20 off their first premium dining experience.",
        image: "/dine.png",
    },
    {
        number: "03",
        title: "You Earn",
        description: "Earn 10% commission on every order they place, forever.",
        image: "/earn.png",
    },
    {
        number: "04",
        title: "Scale Up",
        description: "Watch your monthly recurring revenue grow as you invite more.",
        image: "/scale.png",
    },
];

export default function MapSection() {
    return (
        <section className="py-10 sm:py-16 px-4 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#151C27] mb-3 sm:mb-4">
                    Simple. Transparent. <span className="text-[#006A34]">Rewarding.</span>
                </h2>
                <p className="text-[#36654D] text-xs sm:text-sm md:text-base">
                    Four easy steps to start your referral journey today.
                </p>
            </div>

            {/* Steps */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
                {/* Step numbers row with dashed connector */}
                <div className="relative flex items-center justify-between mb-8 px-4 sm:px-8 md:px-16">
                    {/* Dashed line behind circles */}
                    <div className="absolute left-[12%] right-[12%] top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#0D9733]/40 z-0" />

                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative z-10 w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-[#0D9733]/50 bg-white flex items-center justify-center shadow-sm"
                        >
                            <span className="text-[#0D9733] font-bold text-xs sm:text-base md:text-lg">
                                {step.number}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Cards row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.title}
                            className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Image */}
                            <div className="w-28 h-24 sm:w-32 sm:h-28 md:w-36 md:h-32 relative mb-4 sm:mb-5 flex items-center justify-center">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-[#151C27] font-bold text-base md:text-lg mb-2">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
