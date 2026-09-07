import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 overflow-hidden">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151C27] tracking-tight">Discover more.</h2>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#CF0738] tracking-tight">Pay less.</h2>
                </div>

                <p className="font-medium text-base sm:text-lg text-[#151C27] max-w-xl leading-relaxed">Vibez is a 2-for-1 restaurant deals app in Zurich. Get exclusive offers like free starters, desserts, and exclusive deals by selected restaurants.</p>

                {/* Download Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto">
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

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end my-6 lg:my-0 relative">
                <div className="relative w-65 h-65 xs:w-75 xs:h-75 sm:w-95 sm:h-95 lg:w-120 lg:h-120 flex items-center justify-center">
                    {/* Layer 1: Background & Custom Dashed Border */}
                    <div
                        className="absolute inset-0 z-0 rounded-full animate-[spin_40s_linear_infinite]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='300' ry='300' stroke='%23000000' stroke-width='3' stroke-dasharray='1%2c 30' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"), radial-gradient(circle, #FCF1F4 0%, white 100%)`,
                            backgroundOrigin: "border-box",
                        }}
                    />

                    {/* Layer 2: Rotating Balls */}
                    <div className="absolute inset-0 z-20 animate-[spin_15s_linear_infinite]">
                        {/* Ball 1 - Top */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-[#CF0738] rounded-full shadow-lg shadow-[#CF0738]/40 border-2 border-white" />
                        {/* Ball 2 - Bottom */}
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-[#EAB308] rounded-full shadow-lg shadow-[#EAB308]/40 border-2 border-white" />
                    </div>

                    {/* Layer 3: Image Container */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-10">
                        <div className="relative w-full h-full">
                            <Image src="/hero2.png" alt="VIBEZ App Preview" fill className="object-contain drop-shadow-2xl" priority />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
