
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator"
import CreatePostForm from "@/features/post/components/CreatePostForm";
import PostList from "@/features/post/components/PostList";
import { Suspense } from "react";




export default async function PostsPage (){
    return (
        <>
      
        <Heading title="All posts" description="This is post page."/>
        <Separator className="my-2"/>
        <CreatePostForm/>
        <Suspense fallback={<p className="text-3xl text-red-400">Loading...</p>}>
          <PostList/>
        </Suspense>
        </>
    )
}