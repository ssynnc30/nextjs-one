
import prisma from "@/lib/prisma";
// import { Post } from "../types/types";
import { Post, User } from "@/generated/prisma/client";
import { SearchParams } from "../types/types";



interface PostsWithUser extends Post {
 user:User,
 votes:{value:number,userId:string}[]
};



export default async function getPosts (searchParams:SearchParams):Promise<{
    posts:PostsWithUser[];
    totalPages:number
}>{
    const page=Number(searchParams.page) || 1;
    const limit=8;
    const skip=(page-1)*limit;
    const tagFilter=searchParams.tag;

    const where={
        title:{
            contains:searchParams.search ?? "",
            mode:"insensitive" as const
        },
        ...(tagFilter && {
            tags:{
                has:tagFilter
            }
        })
    }
const [posts,totalPosts]=await Promise.all([
 prisma.post.findMany({
   where,

    include:{
        user:true,
        votes:{
            select:{
                value:true,
                userId:true
            }
        }
    },

    orderBy:{
        createdAt:searchParams.sort==="asc"? "asc": "desc"
    },

    skip,
    take:limit,
}),

prisma.post.count({
    where,
})
]);

const totalPages=Math.ceil(totalPosts/limit)
return {
    posts,
    totalPages
}
}