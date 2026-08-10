"use server";

import { homePath} from "@/lib/path";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";




export const logout=async ()=>{
    try{

   
   await auth.api.signOut({
    headers:await headers()
   })
 
  }catch(err){
    console.log(`Error Message ${err}`)
 throw new Error("Something went wrong !!!")
  };
   
  revalidatePath(homePath)
   redirect(homePath)

    }
