"use server";

import { detailsPostPath, loginPath, postspath } from "@/lib/path";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateCommentSchema } from "../schemas/create-comment";




export const createComment = actionClient
    .inputSchema(CreateCommentSchema)
    .action(async ({ parsedInput: { content,postId} }) => {
    const session = await auth.api.getSession({
    headers: await headers() 
});

 if(!session){
  redirect(loginPath)
 }
        try{

   
  await prisma.comment.create({
    data:{
        content,
        postId,
        userId:session?.user?.id
    }
  });

  revalidatePath(postspath)
//   revalidatePath(detailsPostPath(postId))

 
  }catch(err){
    console.log(err)
 throw new Error("Something went wrong !!!")
  }

    });

