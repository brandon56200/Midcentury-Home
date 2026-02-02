import { z } from "zod";

export const BlogElementSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().optional(),
    type: z.literal("banner"),
    url: z.string().url(),
    alt: z.string().optional(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("title"),
    text: z.string(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("subtitle"),
    text: z.string(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("authors"),
    list: z.array(
      z.object({
        name: z.string(),
        xProfile: z.string().optional(),
        avatar: z.string().optional(),
      })
    ),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("date"),
    text: z.string(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("paragraph"),
    text: z.string(), // Supports basic tags: <b>, <i>, <u>, <a>
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("image"),
    url: z.string().url(),
    caption: z.string().optional(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("space"),
    height: z.enum(["small", "medium", "large"]).default("medium"),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("code"),
    code: z.string(),
    language: z.string().default("typescript"),
    fileName: z.string().optional(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("table"),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }),
]);

export type BlogElement = z.infer<typeof BlogElementSchema>;

export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.string().optional(),
  }),
  content: z.array(BlogElementSchema),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
