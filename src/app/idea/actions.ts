"use server";

import { env } from "~/env";

export async function checkIdeaPassword(password: string) {
  return password === env.IDEA_PASSWORD;
}
