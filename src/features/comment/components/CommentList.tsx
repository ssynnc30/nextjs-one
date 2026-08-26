import getAllComments from "../queries/getAllComments";
import CommentItem from "./CommentItem";

interface Props{
    postId:string
}
export default async function CommentList ({postId}:Props){
const comments=await getAllComments(postId)
    return (
        <div>
            {
                comments.map((comment)=>(
              <CommentItem key={comment.id} comment={comment} />
                ))
            }
        
        </div>
        
    )
}