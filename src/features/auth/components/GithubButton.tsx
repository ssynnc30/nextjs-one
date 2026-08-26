"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";



export default function GithubButton (){
  const githubSignInHandler=async ()=>{
   await authClient.signIn.social({
        provider: "github"
    })
  }
    return(
        <>
        <Button variant={"outline"} className="w-full mb-3" onClick={githubSignInHandler}>Continue with Github</Button>
        </>
    )
}