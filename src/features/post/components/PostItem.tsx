"use client";

import { PostItemProps } from "../types/types";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { editPostPath, detailsPostPath} from "@/lib/path";
import { cn } from "@/lib/utils";
import { deletePost } from "@/features/post/actions/delete-post";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { DeleteButton } from "./DeleteButton";


export default function PostItem ({id,title,description,isCard=true}:PostItemProps){

    const [isPending,startTransition]=useTransition();

    const deletePostHandler=()=>{
        startTransition(async()=>{
            await deletePost({id:id as string})
        })
    }


    return(
        <Card className="my-5">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription className={cn(isCard && "line-clamp-2")}>{description}</CardDescription>
  </CardHeader>
 {
    isCard && (
         <CardContent className="flex items-center gap-5">
        <Link className="flex items-start gap-2" href={detailsPostPath(id)}>
       <Button variant="outline">View</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
    </Link>
     <Link href={editPostPath(id)}>
     <Button>Edit</Button>
     </Link>
  </CardContent>
    )
 }
 {
  !isCard && (
    <CardFooter>
  {/* <Button onClick={deletePostHandler} disabled={isPending} >
    {
      isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Delete")
    }
  </Button> */}
  <DeleteButton id={id as string}/>
 </CardFooter>
  )
 }

        </Card>
    )
}