
import { Post, User, Vote } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";


interface PostWithUser extends Post{
user:User,
votes:Vote[]
}

export default async function getPostsByUser ():Promise<PostWithUser[]>{
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });
    if(!session?.user){
        return [];
    }
const posts=await prisma.post.findMany({
    where:{
userId:session.user.id
    },
    include:{
        user:true,
        votes:true
    },
    orderBy:{
        createdAt:"desc"
    }
});
return posts;

}