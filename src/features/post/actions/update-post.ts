"use server";

import { postspath } from "@/lib/path";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdatePostSchema } from "../schemas";


export const updatePost = actionClient
  .inputSchema(UpdatePostSchema)
  .action(async ({ parsedInput: { id,title, director,review } }) => {
    try{


  await prisma.post.update({
    where:{
        id
    },
     data:{
        title,
        director,
        review
    }
  })
}catch(err){
 throw new Error("Something went wrong !!!")
  }
 revalidatePath(postspath);
  // redirect(postspath);

  });

