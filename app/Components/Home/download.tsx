import React from "react";
import Image from "next/image";

export default function Download() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 text-center overflow-hidden">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#013622] mb-3 tracking-tight leading-tight">Download The VIBEZ App</h2>
                <p className="text-[#36654D] text-sm sm:text-base md:text-xl">Register and start ordering in less than 2 minutes.</p>
            </div>

            {/* App Screen Showcase */}
            <div className="relative w-full max-w-[320px] sm:max-w-137.5 md:max-w-175 lg:max-w-212.5 mx-auto mb-8 sm:mb-12 aspect-4/3 flex justify-center items-center">
                <Image src="/phone.png" alt="VIBEZ App on phones" fill className="object-contain" priority />
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center">
                {/* App Store */}
                <a href="#" className="flex items-center justify-center gap-3 bg-[#151C27] text-white px-5 sm:px-6 py-3 rounded-xl shadow-lg hover:bg-black transition-colors w-full sm:w-auto">
                    <Image src="/apple.svg" alt="Apple Store" width={20} height={20} />
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-medium opacity-80 leading-none">Download on the</p>
                        <p className="text-sm sm:text-md font-semibold leading-tight">App Store</p>
                    </div>
                </a>

                {/* Google Play */}
                <a href="#" className="flex items-center justify-center gap-3 bg-[#151C27] text-white px-5 sm:px-6 py-3 rounded-xl shadow-lg hover:bg-black transition-colors w-full sm:w-auto">
                    <Image src="/playstore.svg" alt="Google Play" width={20} height={20} />
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-medium opacity-80 leading-none">Get it on</p>
                        <p className="text-sm sm:text-md font-semibold leading-tight">Google Play</p>
                    </div>
                </a>
            </div>
        </div>
    );
}
