import PostItem from "@/features/post/components/PostItem";
import getPostsByUser from "../queries/getPostsByUser";


export default async function PostListByUser (){
const posts=await getPostsByUser();
console.log(posts)
    return (
            <div>
      {
        posts.map((post)=>(
        <PostItem   {...post} key={post.id}/>
        ))
      }
    </div>
    )
}