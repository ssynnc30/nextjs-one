import getPosts from "@/features/post/queries/getPosts";
import PostItem from "@/features/post/components/PostItem";


export default async function PostList (){
const posts=await getPosts();

    return (
            <div>
      {
        posts.map((post)=>(
        <PostItem key={post.id}  title={post.title} description={post.review} id={post.id}/>
        ))
      }
    </div>
    )
}