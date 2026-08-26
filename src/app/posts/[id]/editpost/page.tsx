import EditPostForm from "@/features/post/components/EditPostForm";
import getPost from "@/features/post/queries/getPost";
import { isOwner } from "@/lib/isOwner";
import { notFound } from "next/navigation";


interface EditPageProps {
    params:Promise<{id:string}>
}

export default async function EditPage ({params}:EditPageProps){
const {id}=await params;
    const post=await getPost(id);
    const owner=await isOwner(post?.user.id!)

   if(!post ||!owner){
           notFound();
       }
    return(
        <>
        <EditPostForm post={post}/>
        </>
    )
}