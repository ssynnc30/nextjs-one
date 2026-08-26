"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { authResetPasswordSchema } from "../schemas/auth-reset-password";
import { changePasswordPath, loginPath } from "@/lib/path";




export const resetPassword = actionClient
    .inputSchema(authResetPasswordSchema)
    .action(async ({ parsedInput: { email} }) => {
        try{

   console.log(`${process.env.BETTER_AUTH_URL}/${loginPath}`)
   await auth.api.requestPasswordReset({
    body:{
        email,
        redirectTo: `${process.env.BETTER_AUTH_URL}/${changePasswordPath}`,
    }
   })
 
  }catch(err){
    console.log(`Error Message ${err}`)
 throw new Error("Something went wrong !!!")
  };

    });
