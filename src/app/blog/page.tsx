import React from "react";
import Link from "next/link";
import { getAllPosts } from "~/server/blog";
import Navbar from "~/components/sections/Navbar";
import Footer from "~/components/sections/Footer";
import { motion } from "framer-motion";

export const metadata = {
  title: "Blog | Midcentury Labs",
  description: "Insights into multimodal intelligence, data infrastructure, and the future of AI.",
};

export default async function BlogListingPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">From the Labs</h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Research, engineering updates, and company news from the Midcentury team.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between group">
              <div className="relative w-full">
                <img
                  src={post.metadata.image ?? "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832"}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] border border-white/10 group-hover:border-white/20 transition-colors"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.metadata.date} className="text-gray-500">
                    {post.metadata.date}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-300 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.metadata.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                    {post.metadata.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-white">
                      <span className="absolute inset-0" />
                      {post.metadata.author}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="mt-24 text-center">
            <p className="text-gray-500 italic">No posts published yet. Stay tuned!</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
