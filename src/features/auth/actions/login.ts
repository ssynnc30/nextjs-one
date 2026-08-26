"use server";

import { homePath, postspath} from "@/lib/path";
import { authLoginSchema} from "../schemas";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";




export const login = actionClient
    .inputSchema(authLoginSchema)
    .action(async ({ parsedInput: { email,password} }) => {
        try{

   
   await auth.api.signInEmail({
    body:{
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

