

import CreatePostForm from "@/features/post/components/CreatePostForm";
import PostListByUser from "@/features/post/components/PostListByUser";
import { Suspense } from "react";




export default async function PostsPage (){
    return (
        <>
        <h1 className="text-4xl text-center font-bold my-10">User Posts</h1>
        <CreatePostForm/>
        <Suspense fallback={<p className="text-3xl text-red-400">Pending...</p>}>
                  <PostListByUser/>
                </Suspense>
      
        </>
    )
}