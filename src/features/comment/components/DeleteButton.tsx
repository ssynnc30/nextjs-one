"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { deleteComment } from "../actions/delete-comment";
import { LoaderCircle } from "lucide-react";

interface DeleteButtonProps{
    commentId:string,
    userId:string,
}


export default function DeleteButton ({commentId,userId}:DeleteButtonProps){

const {execute,isPending}=useAction(deleteComment);
   
    return(
        <Button className="my-5" onClick={()=>{execute({commentId,userId})}} >
             {
        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Delete")
         }
        </Button>
    )
}


 