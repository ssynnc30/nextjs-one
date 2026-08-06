"use server";

import { postspath } from "@/lib/path";
import prisma from "@/lib/prisma"
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeletePostSchema } from "../schemas";




 



export const deletePost = actionClient
  .inputSchema(DeletePostSchema)
  .action(async ({ parsedInput: { id } }) => {
    try{
await prisma.post.delete({
    where:{
        id
    }
});
revalidatePath(postspath)
}catch(err){
 throw new Error("Something went wrong !!!")
  };
  });