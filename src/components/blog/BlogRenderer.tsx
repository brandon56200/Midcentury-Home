"use client";

import React from "react";
import { motion } from "framer-motion";
import type { BlogElement, BlogPost } from "~/types/blog";
import { cn } from "~/lib/utils";

interface BlogRendererProps {
  post: BlogPost;
  className?: string;
}

const fadeIn: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const BlogRenderer: React.FC<BlogRendererProps> = ({ post, className }) => {
  return (
    <article className={cn("mx-auto max-w-4xl px-6 py-20", className)}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] } as any}
        className="mb-20 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Latest Intelligence
        </div>
        <h1 className="text-gradient mb-6 text-5xl font-bold tracking-tight sm:text-7xl leading-[1.1]">
          {post.metadata.title}
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-400 leading-relaxed">
          {post.metadata.description}
        </p>
        <div className="mt-12 flex items-center justify-center gap-6 text-xs font-medium uppercase tracking-widest text-gray-500">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-white/10"></span>
            {post.metadata.date}
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-indigo-500"></span>
            {post.metadata.author}
          </div>
        </div>
      </motion.div>

      <div className="space-y-12">
        {post.content.map((element, index) => (
          <motion.div key={index} {...fadeIn}>
            <ElementRenderer element={element} />
          </motion.div>
        ))}
      </div>
    </article>
  );
};

const ElementRenderer: React.FC<{ element: BlogElement }> = ({ element }) => {
  switch (element.type) {
    case "banner":
      return (
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-4xl border border-white/10 shadow-2xl">
          <img
            src={element.url}
            alt={element.alt ?? "Banner"}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      );

    case "title":
      return (
        <h2 className="mt-20 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {element.text}
        </h2>
      );

    case "subtitle":
      return (
        <h3 className="mt-12 text-xl font-semibold text-indigo-300 uppercase tracking-widest">
          {element.text}
        </h3>
      );

    case "authors":
      return (
        <div className="glass flex flex-wrap gap-8 rounded-4xl p-8 mt-16">
          {element.list.map((author, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=random`}
                  className="h-12 w-12 rounded-2xl border border-white/10 object-cover"
                  alt={author.name}
                />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-indigo-500 border-2 border-black" />
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-tight">
                  {author.name}
                </div>
                {author.xProfile && (
                  <a
                    href={author.xProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-gray-500 hover:text-indigo-400 transition-colors uppercase tracking-widest"
                  >
                    @{author.xProfile.split("/").pop()}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case "date":
      return <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{element.text}</div>;

    case "paragraph":
      return (
        <p
          className="text-lg leading-[1.8] text-gray-300 font-medium"
          dangerouslySetInnerHTML={{ __html: element.text }}
        />
      );

    case "image":
      return (
        <figure className="space-y-4 py-8">
          <div className="overflow-hidden rounded-4xl border border-white/10 bg-zinc-900 shadow-2xl">
            <img src={element.url} className="w-full h-auto" alt={element.caption} />
          </div>
          {element.caption && (
            <figcaption className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
              {element.caption}
            </figcaption>
          )}
        </figure>
      );

    case "space":
      const heights = { small: "h-8", medium: "h-16", large: "h-32" };
      return <div className={heights[element.height ?? "medium"]} />;

    case "code":
      return (
        <div className="group relative mt-8 overflow-hidden rounded-4xl border border-white/10 bg-zinc-950/80 shadow-2xl">
          {element.fileName && (
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{element.fileName}</span>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
              </div>
            </div>
          )}
          <pre className="overflow-x-auto p-8 text-sm font-mono text-indigo-100/90 leading-relaxed custom-scrollbar">
            <code>{element.code}</code>
          </pre>
          <div className="absolute bottom-4 right-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">
            {element.language}
          </div>
        </div>
      );

    case "table":
      return (
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/2 mt-12 shadow-xl">
          <table className="w-full text-left text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="bg-white/5">
                {element.headers.map((h, i) => (
                  <th key={i} className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 border-b border-white/5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {element.rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/3 transition-colors group">
                  {row.map((cell, j) => (
                    <td key={j} className="px-8 py-5 font-medium group-hover:text-white transition-colors">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};
