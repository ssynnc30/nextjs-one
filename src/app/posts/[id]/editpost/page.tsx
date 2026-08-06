import EditPostForm from "@/features/post/components/EditPostForm";
import getPost from "@/features/post/queries/getPost";
import { notFound } from "next/navigation";


interface EditPageProps {
    params:Promise<{id:string}>
}

export default async function EditPage ({params}:EditPageProps){
const {id}=await params;
    const post=await getPost(id);

   if(!post){
           notFound();
       }
    return(
        <>
        <EditPostForm post={post}/>
        </>
    )
}