import * as z from "zod";

export const UpdatePostSchema = z.object({
    id:z.string(),
  title: z.string().trim().min(3,"Title must be ...").max(80,"Title must not exceed..."),
    director: z.string().trim().min(3,"Name must be ...").max(40,"Name must not exceed..."),
    review: z.string().min(3).max(100,"Comments must not exceed...")
});