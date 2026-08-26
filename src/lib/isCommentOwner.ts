"use server"

import { headers } from "next/headers";
import { auth } from "./auth";



export const isCommentOwner=async (userId:string)=>{
     const session = await auth.api.getSession({
      headers: await headers() 
  });
    return userId===session?.user.id
}