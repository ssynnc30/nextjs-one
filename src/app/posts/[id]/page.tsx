import CommentList from "@/features/comment/components/CommentList";
import CreateCommentForm from "@/features/comment/components/CreateCommentForm";
import PostItem from "@/features/post/components/PostItem";
import getPost from "@/features/post/queries/getPost";
import { notFound } from "next/navigation";

interface Props {
    params:Promise<{id:string}>
}

export default async function DetailsPage ({params}:Props){
    const {id}=await params;
    const post=await getPost(id);
   

    if(!post){
        notFound();
    }

  return(
    <>
    <PostItem {...post} isCard={false}/>
    <CreateCommentForm/>
    <CommentList postId={id} />
    </>
  )
}

