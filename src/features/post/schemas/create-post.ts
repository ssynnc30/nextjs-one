import * as z from "zod";

export const CreatePostSchema = z.object({
  title: z.string().trim().min(3,"Title must be ...").max(80,"Title must not exceed..."),
  director: z.string().trim().min(3,"Name must be ...").max(40,"Name must not exceed..."),
  review: z.string().min(3).max(300,"Comments must not exceed..."),
  // image:z.array(z.custom<File>((val)=>typeof window !== "undefined" && val instanceof File,"Invalid file format")).max(4,"You can upload maximum 4 images");
  image:z.array(z.any()).optional(),
  tags:z.array(z.string().trim().min(1).max(20)).max(5)
});