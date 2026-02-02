import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "~/server/blog";
import { BlogRenderer } from "~/components/blog/BlogRenderer";
import Navbar from "~/components/sections/Navbar";
import Footer from "~/components/sections/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.metadata.title} | Midcentury Labs`,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24">
        <BlogRenderer post={post} />
      </div>
      <Footer />
    </main>
  );
}
