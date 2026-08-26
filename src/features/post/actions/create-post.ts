"use server";

import { loginPath, postspath } from "@/lib/path";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreatePostSchema } from "../schemas";
import { actionClient } from "@/lib/safe-action";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";




export const createPost = actionClient
	.inputSchema(CreatePostSchema)
	.action(async ({ parsedInput: { title, director,review,image=[],tags=[]} }) => {
    const session = await auth.api.getSession({
    headers: await headers() 
});

 if(!session){
  redirect(loginPath)
 }
		try{

   
  await prisma.post.create({
    data:{
        title,
        director,
        review,
        image,
        tags,
        userId:session?.user?.id
    }
  });

  revalidatePath(postspath);
  

 
  }catch(err){
 throw new Error("Something went wrong !!!")
  }

	});

