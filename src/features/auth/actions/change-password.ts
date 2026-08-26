"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { authChangePasswordSchema } from "../schemas/auth-change-password";
import { redirect } from "next/navigation";
import { loginPath } from "@/lib/path";




export const changePassword = actionClient
    .inputSchema(authChangePasswordSchema)
    .action(async ({ parsedInput: { newPassword,token} }) => {
        
       
        try{

   await auth.api.resetPassword({
    body:{
        newPassword,
        token
    }
   })
 
  }catch(err){
    console.log(`Error Message ${err}`)
 throw new Error("Something went wrong !!!")
  };

  redirect(loginPath)

    });
