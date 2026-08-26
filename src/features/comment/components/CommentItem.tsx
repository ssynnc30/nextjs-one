
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CommentsWithUsername } from "../types/type"
import { isCommentOwner } from "@/lib/isCommentOwner"
import DeleteButton from "./DeleteButton"

interface CommentItemProps{
    comment:CommentsWithUsername
}

export default async function  CommentItem ({comment}:CommentItemProps){

    return (
    
        <Card className="my-5">
  <CardHeader>
    <CardTitle>Review</CardTitle>
  </CardHeader>
  <CardContent>
    <h2>{comment.user.name}</h2>
    <p className="line-clamp-3">{comment.content}</p>
    {
    await isCommentOwner(comment.user.id) && <DeleteButton commentId={comment.id} userId={comment.user.id}/>
    }
  </CardContent>
</Card>
        
    )
}