import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto bg-[#013622] pb-12 pt-20 text-white/90">
            <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-4">
                        <Link href="/">
                            <Image src="/logo2.svg" alt="Logo" width={100} height={100} />
                        </Link>
                        <p className="mt-4 max-w-70 text-sm leading-relaxed text-zinc-300">Connecting people with the best local food experiences while helping restaurants grow.</p>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-8">
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-4">
                            <div>
                                <h3 className="text-sm font-bold text-white">Discovery</h3>
                                <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                                    <li>
                                        <Link href="/restaurant" className="transition-colors hover:text-white">
                                            Restaurants
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Company</h3>
                                <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                                    <li>
                                        <Link href="/partner" className="transition-colors hover:text-white">
                                            Join us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Support</h3>
                                <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                                    <li>
                                        <Link href="/faq" className="transition-colors hover:text-white">
                                            FAQ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Follow Us</h3>
                                <ul className="mt-6 space-y-4 text-sm text-zinc-300 flex gap-4">
                                    <li>
                                        <Link href="#">
                                            <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <Image src="/tiktok.svg" alt="TikTok" width={24} height={24} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Clean Impressum & Legal Information */}
                <div className="mt-16 border-t border-white/20 pt-8 space-y-3 text-xs text-zinc-400">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <p>© {new Date().getFullYear()} VIBEZ (getvibez.app). All rights reserved.</p>
                        <p className="font-medium text-zinc-300">X-Auktionata GmbH · Hasenweg 11, 5034 Suhr · Vertretungsberechtigt: Marc Schuppisser</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-zinc-400 pt-2 border-t border-white/10">
                        <span>
                            <strong>Firma:</strong> X-Auktionata GmbH
                        </span>
                        <span>
                            <strong>Rechtsform:</strong> GmbH
                        </span>
                        <span>
                            <strong>UID:</strong> CHE-194.051.063
                        </span>
                        <span>
                            <strong>E-Mail:</strong>{" "}
                            <a href="mailto:info@xauktionata.GmbH" className="hover:text-white underline">
                                info@xauktionata.GmbH
                            </a>
                        </span>
                        <span>
                            <strong>Webseite:</strong> getvibez.app
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
