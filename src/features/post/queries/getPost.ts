
import prisma from "@/lib/prisma";
import { Post } from "../types/types";



export default async function getPost (id:string):Promise<Post|null>{
const post=await prisma.post.findUnique({
    where:{
id
    }
});
return post

}