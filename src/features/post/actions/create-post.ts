"use server";

import { postspath } from "@/lib/path";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreatePostSchema } from "../schemas";
import { actionClient } from "@/lib/safe-action";




export const createPost = actionClient
	.inputSchema(CreatePostSchema)
	.action(async ({ parsedInput: { title, director,review } }) => {
		try{

   
  await prisma.post.create({
    data:{
        title,
        director,
        review
    }
  });

  revalidatePath(postspath)

 
  }catch(err){
 throw new Error("Something went wrong !!!")
  }

	});

