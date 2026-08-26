
import { Post, User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

interface PostWithUser extends Post{
user:User,
votes:{value:number,userId:string}[]
}

export default async function getPost (id:string):Promise<PostWithUser|null>{
const post=await prisma.post.findUnique({
    where:{
id
    },
    include:{
        user:true,
        votes:{
            select:{
                value:true,
                userId:true
            }
        }
    }
});
return post

}