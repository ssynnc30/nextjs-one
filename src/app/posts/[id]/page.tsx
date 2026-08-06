import PostItem from "@/features/post/components/PostItem";
import getPost from "@/features/post/queries/getPost";
import { notFound } from "next/navigation";

interface Props {
    params:Promise<{id:string}>
}

export default async function DetailsPage ({params}:Props){
    const {id}=await params;
    const post=await getPost(id);
    // const post=fakePosts.find((post)=>{
    //    return post.id===id
    // })

    if(!post){
        notFound();
    }

  return(
    <>
    {/* <h1 className="text-center">Details Page Number {id}</h1>
    <h1 className="text-xl font-bold">{post.title}</h1>
    <h2>{post.director}</h2>
    <p>{post.review}</p> */}
    <PostItem id={post.id} title={post.title} description={post.review} isCard={false}/>
    </>
  )
}

// export async function generateStaticParams() {
//   const posts = await getPosts();
 
//   return posts.map((post) => ({
//     id: post.id,
//   }))
// }