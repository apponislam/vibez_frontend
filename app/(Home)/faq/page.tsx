import Badge from "@/app/Components/Home/Badge";
import Image from "next/image";
import FAQAccordion from "@/app/Components/Home/FAQAccordion";
import Link from "next/link";

export default function FAQ() {
    return (
        <div className="overflow-x-hidden">
            <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 text-center lg:text-left">
                <div className="w-full max-w-132.5 flex justify-center">
                    <Image src="/faqcover.png" alt="FAQ" width={530} height={500} className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg object-contain" priority />
                </div>
                <div className="w-full max-w-xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-snug">
                        More guests. More revenue. <span className="text-[#CF0738]">No costs.</span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#4F7863] leading-relaxed">Join the fastest-growing restaurant community and reach thousands of food enthusiasts in your city without the typical commission fees.</p>
                    <div className="mt-8">
                        <p className="text-base sm:text-lg mb-4 font-medium">Become a Partner</p>
                        <Link href="/partner">
                            <button className="w-full sm:w-auto px-12 sm:px-20 py-3 font-semibold bg-[#CF0738] text-white rounded-full hover:bg-[#b0052e] transition-colors shadow-md">Join Now</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <div className="pb-20">
                <h2 className="text-center font-bold text-4xl mb-12 text-[#151C27]">Our partners</h2>
                <div className="bg-[#F1F5F9] py-10">
                    <Badge />
                </div>
            </div> */}

            {/* Questions Section */}
            <FAQAccordion />

            {/* Ready Section (CTA) */}
            <div className="container mx-auto max-w-6xl px-4 pb-12 md:pb-20">
                <div className="relative bg-[#19E68C] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-20 text-center overflow-hidden">
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#013622] mb-4 sm:mb-6">Ready to fill your tables?</h2>
                        <p className="text-[#013622]/80 text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 leading-relaxed">Join over 7,000 restaurants already growing with NeoTaste. Request your partnership today.</p>
                        <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#151C27] text-white font-bold rounded-full hover:bg-black transition-colors shadow-xl">Get Started Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
