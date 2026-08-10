"use server";

import { loginPath} from "@/lib/path";
import { authRegisterSchema} from "../schemas";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";




export const register = actionClient
    .inputSchema(authRegisterSchema)
    .action(async ({ parsedInput: { name,email,password} }) => {
        try{

   
   await auth.api.signUpEmail({
    body:{
        name,
        email,
        password
    }
   })
 
  }catch(err){
 throw new Error("Something went wrong !!!")
  };

   redirect(loginPath)

    });

