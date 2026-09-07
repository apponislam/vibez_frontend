import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, alsoReadPosts } from "@/lib/blogData";

const categories = ["All Posts", "Restaurants", "Burgers", "Pizza"];

export default function Blogs() {
    const featuredPost = blogPosts[0];
    const gridPosts = blogPosts.slice(1);

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-semibold text-[#151C27] mb-6">Stay up to date with the Vibez blog</h1>
                <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">Here you'll find the latest food trends, restaurant guides and gastronomy tips – browse through the categories to discover the best restaurants in your city.</p>
            </div>

            {/* Featured Post */}
            <div className="bg-white rounded-none overflow-hidden border border-zinc-100 shadow-xl mb-16 group">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[60%] relative h-75 lg:h-[450px] overflow-hidden">
                        <Image src={featuredPost.image} alt="Featured" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="w-full lg:w-[40%] p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-[#36654D] font-bold text-xs uppercase tracking-widest mb-4">{featuredPost.category}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#151C27] mb-6">{featuredPost.title}</h2>
                        <p className="text-zinc-500 mb-8 leading-relaxed">{featuredPost.summary}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8 font-medium">
                            <span className="underline">{featuredPost.author}</span>
                            <span>{featuredPost.location}</span>
                        </div>
                        <Link href={`/blogs/${featuredPost.id}`}>
                            <button className="bg-[#CF0738] text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-all">Read Article</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-8 mb-12 border-b border-zinc-100 pb-4">
                {categories.map((cat, idx) => (
                    <button key={cat} className={`text-sm md:text-base font-bold pb-4 relative ${idx === 0 ? "text-[#151C27]" : "text-zinc-400 hover:text-zinc-600"}`}>
                        {cat}
                        {idx === 0 && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#19E68C]" />}
                    </button>
                ))}
            </div>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {gridPosts.map((post) => (
                    <Link key={post.id} href={`/blogs/${post.id}`} className="group block bg-white shadow-md border border-zinc-50 overflow-hidden">
                        <div className="relative w-full h-[250px] lg:h-75 rounded-none overflow-hidden">
                            <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500" />
                        </div>
                        <div className="p-6 space-y-4">
                            <span className="text-[#CF0738] font-bold text-xs uppercase tracking-widest">{post.category}</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#151C27] group-hover:text-[#CF0738] transition-colors">{post.title}</h3>
                            <p className="text-zinc-500 line-clamp-2 leading-relaxed">{post.summary}</p>
                            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                                <span className="underline">{post.author}</span>
                                <span>{post.location}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Also Read Section */}
            <div className="mt-24 pt-24 border-t border-zinc-100">
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
    );
}
