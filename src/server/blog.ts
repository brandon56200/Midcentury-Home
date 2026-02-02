import fs from "fs";
import path from "path";
import { BlogPostSchema, type BlogPost } from "~/types/blog";

const BLOG_DIRECTORY = path.join(process.cwd(), "src/content/blog");

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIRECTORY);
  const posts = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(BLOG_DIRECTORY, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      try {
        const json = JSON.parse(fileContent);
        return BlogPostSchema.parse(json);
      } catch (error) {
        console.error(`Error parsing blog post ${file}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
