import * as z from "zod";

export const CreateCommentSchema = z.object({
  content: z.string().trim().min(10,"Comment must be ...").max(300,"Comment must not exceed..."),
  postId: z.string(),
});