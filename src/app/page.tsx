import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import PostList from "@/features/post/components/PostList";
import { SearchParams } from "@/features/post/types/types";
import { Suspense } from "react";


interface Props{
  searchParams:Promise<SearchParams>
}
export default async function Home ({searchParams}:Props){
  const params=await searchParams;
  return(
    <>
       <h1 className="text-center text-4xl ont-bold my-5">Welcome Home</h1>
        <Suspense fallback={<p className="text-3xl text-red-400">Pending...</p>}>
          <PostList searchParams={params}/>
        </Suspense>
    </>
  )
}
