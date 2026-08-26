import * as z from "zod";

export const DeleteCommentSchema = z.object({
  commentId: z.string(),
  userId:z.string()
});