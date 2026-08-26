"use server";

import { loginPath, postspath } from "@/lib/path";
import prisma from "@/lib/prisma"
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeletePostSchema } from "../schemas";
import { isOwner } from "@/lib/isOwner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";




 



export const deletePost = actionClient
  .inputSchema(DeletePostSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await auth.api.getSession({
            headers: await headers() 
        });
    try{

         if(!session){
              redirect(loginPath)
            };

    if(!isOwner(session?.user.id)){
            throw new Error("U are not owner.")
          }
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