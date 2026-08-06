
import prisma from "@/lib/prisma";
import { Post } from "../types/types";



export default async function getPosts ():Promise<Post[]>{
const posts=await prisma.post.findMany({
    orderBy:{
        createdAt:"desc"
    }
});
return posts
}