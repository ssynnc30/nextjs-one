import * as z from "zod";

export const BasePostSchema = z.object({
  title: z.string().min(3).max(80),
  director: z.string().min(3).max(40),
  review: z.string().min(3).max(200)
});