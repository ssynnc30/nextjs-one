"use server";

import { loginPath, postspath } from "@/lib/path";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdatePostSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { isOwner } from "@/lib/isOwner";


export const updatePost = actionClient
  .inputSchema(UpdatePostSchema)
  .action(async ({ parsedInput: { id,title, director,review,image=[],tags=[] } }) => {
    const session = await auth.api.getSession({
        headers: await headers() 
    });

    if(!session){
      redirect(loginPath)
    };

    try{

      if(!isOwner(session?.user.id)){
        throw new Error("U are not owner.")
      }

  await prisma.post.update({
    where:{
        id
    },
     data:{
        title,
        director,
        review,
        image,
        tags
    }
  })
}catch(err){
 throw new Error("Something went wrong !!!")
  }
 revalidatePath(postspath);
  // redirect(postspath);

  });

