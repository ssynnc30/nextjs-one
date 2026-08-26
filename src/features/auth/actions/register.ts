"use server";

import { homePath, loginPath} from "@/lib/path";
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
   });

   return {
    success:true,
    error:null
   }
 
  }catch(err:any){
    console.log(err);
    const errorMessage=err.message||err.body.message||"Something Went wrong";

    return {
        success:false,
        error:errorMessage
    }
 
  };


    });

