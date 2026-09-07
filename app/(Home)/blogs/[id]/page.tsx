import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, alsoReadPosts } from "@/lib/blogData";

export default function BlogDetail({ params }: { params: Promise<{ id: string }> | any }) {
    // Await params if it's a promise, or safely access it
    const resolvedParams: any = params instanceof Promise ? React.use(params) : params;
    const id = resolvedParams?.id || "1";
    const post = blogPosts.find((p) => p.id === Number(id)) || blogPosts[0];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Centered and max-width 6xl, height 400px */}
            <div className="container mx-auto px-4 mt-20">
                <div className="relative w-full h-100 flex items-end max-w-6xl mx-auto rounded-none overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-linear-to-t from-[#151C27]/90 via-[#151C27]/40 to-transparent" />

                    <div className="relative z-10 p-8 md:p-12 w-full">
                        <div className="max-w-4xl">
                            <span className="bg-white text-[#151C27] font-bold text-[10px] md:text-xs px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg">{post.category}</span>
                            <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-4">{post.title}</h1>
                            <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                                <span>{post.author}</span>
                                <span>{post.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section - Max width 6xl, expanding full width */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    {/* Highlight Quote */}
                    <div className="border-l-4 border-[#CF0738] pl-8 mb-16 py-2">
                        <p className="text-zinc-500 text-xl md:text-2xl italic leading-relaxed">{post.summary}</p>
                    </div>

                    {/* Article Body - No internal max-w wrap */}
                    <div className="space-y-16">
                        <article className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151C27]">Overview</h2>
                            <p className="text-zinc-500 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
                        </article>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-24 pt-12 border-t border-zinc-100">
                        <div className="text-left space-y-2">
                            <p className="text-[10px] font-bold uppercase text-[#CF0738] tracking-widest">Previous Article</p>
                            <Link href="/blogs" className="flex items-center gap-2 group">
                                <svg className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="font-bold text-[#151C27] hover:text-[#CF0738] transition-colors">Winter Maintenance Tips</span>
                            </Link>
                        </div>
                        <div className="text-right space-y-2">
                            <p className="text-[10px] font-bold uppercase text-[#CF0738] tracking-widest">Next Article</p>
                            <Link href="/blogs" className="flex items-center gap-2 group justify-end">
                                <span className="font-bold text-[#151C27] hover:text-[#CF0738] transition-colors">Choosing the Right Chain Lube</span>
                                <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Also Read Section */}
                    <div className="mt-32">
                        <div className="flex justify-end items-center mb-12">
                            {/* <h2 className="text-4xl font-bold text-[#013622]">Also read</h2> */}
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-[#CF0738] text-white flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center hover:bg-zinc-200 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {alsoReadPosts.map((post) => (
                                <div key={post.id} className="group cursor-pointer overflow-hidden">
                                    <div className="relative w-full h-45 rounded-none overflow-hidden">
                                        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="pt-4">
                                        <h4 className="text-xl font-bold text-[#151C27] group-hover:text-[#CF0738] transition-colors">{post.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
