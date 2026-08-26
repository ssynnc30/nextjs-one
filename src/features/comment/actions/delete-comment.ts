"use server";

import { loginPath, postspath } from "@/lib/path";
import prisma from "@/lib/prisma"
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DeleteCommentSchema } from "../schemas/delete-comment";
import { isCommentOwner } from "@/lib/isCommentOwner";


export const deleteComment = actionClient
  .inputSchema(DeleteCommentSchema)
  .action(async ({ parsedInput: {commentId,userId} }) => {
    const session = await auth.api.getSession({
            headers: await headers() 
        });
    try{

         if(!session){
              redirect(loginPath)
            };

    if(!isCommentOwner(userId)){
            throw new Error("U are not owner.")
          }
await prisma.comment.delete({
    where:{
      id:commentId
    }
});
revalidatePath(postspath)
}catch(err){
 throw new Error("Something went wrong !!!")
  };
  });