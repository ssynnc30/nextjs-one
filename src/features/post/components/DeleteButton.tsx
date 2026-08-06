"use client";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hooks";
import { deletePost } from "../actions/delete-post";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { postspath } from "@/lib/path";
import { redirect, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export function DeleteButton({id}:{id:string}) {
   const router=useRouter();
    const {execute,isPending,hasSucceeded,hasErrored} = useAction(deletePost);

    const deleteHandler=()=>{
        execute({id})
    };

    useEffect(()=>{
        if(hasSucceeded){
            toast.add({
                type: "success",
                description: "Post Deleted  successfully",
              });

             router.push(postspath)
    
        };
    
        if(hasErrored){
            toast.add({
                type: "failed",
                description: "Something Went Wrong.",
              });
        }
      },[hasErrored,hasSucceeded])

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button>Delete</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteHandler} disabled={isPending}>
             {
        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Delete")
         }
        </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
