
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
import { DeleteButton } from "./DeleteButton";
import { Post, User } from "@/generated/prisma/client";
import { isOwner } from "@/lib/isOwner";
import ImageGallery from "./ImageGallery";
import VoteButton from "@/features/vote/components/VoteButton";
import getSession from "@/lib/getSession";
import { Badge } from "@/components/ui/badge";


interface PostItemProps extends Post{
  isCard?:boolean,
  user:User,
  votes:{value:number,userId:string}[];
}

export default async function PostItem ({id,title,director,review,isCard=true,user,image,votes,tags}:PostItemProps){

const session=await getSession();
const currentUserId=session?.user.id;
const userVote=currentUserId? votes?.find((vote)=>vote.userId===currentUserId)?.value || null :null;
const score=votes?.reduce((acc,vote)=>acc+vote.value,0) || 0;
    return(
        <Card className="my-5">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{__html:review}}/>
    <p className="py-2">{director}</p>
    {
      tags && tags.length >0 && (
        <div className="flex items-center gap-3">
          {
            tags.map((tag)=>(
              <Link key={tag} href={`/?tag=${tag}`}>
                <Badge variant={"outline"}>#{tag}</Badge>
              </Link>
            ))
          }
        </div>
      )
    }
  </CardHeader>
  <CardContent>
    <p className="py-2">({user.name})</p>
    <ImageGallery image={image}/>
    <VoteButton postId={id} initialUserVote={userVote} initialScore={score}/>
    </CardContent>
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
     {
       await isOwner(user.id) && <Button>Edit</Button>
     }
     </Link>
  </CardContent>
    )
 }
 
 {
  !isCard && (await isOwner(user.id)) &&  (
    <CardFooter>
  <DeleteButton id={id as string}/>
 </CardFooter>
  )
 }

        </Card>
    )
}