import getPosts from "@/features/post/queries/getPosts";
import PostItem from "@/features/post/components/PostItem";
import SearchBox from "@/components/SearchBox";
import { SearchParams } from "../types/types";
import SortingSelectBox from "@/components/SortingSelectBox";
import PaginationBox from "@/components/PaginationBox";





interface Props{
  searchParams:SearchParams
}

export default async function PostList ({searchParams}:Props){
const {posts,totalPages}=await getPosts(searchParams);
    return (
            <div>
              <SearchBox/>
              <SortingSelectBox/>
      {
        posts.map((post)=>(
        <PostItem  {...post} key={post.id}/>
        ))
      }
      <PaginationBox totalPages={totalPages}/>
    </div>
    )
}