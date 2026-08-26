

import prisma from "@/lib/prisma";



export default async function getAllComments (postId:string){
const comments=await prisma.comment.findMany({
    where:{
postId
    },
    include:{
        user:true
    },
    orderBy:{
        createdAt:"desc"
    }
});
return comments

}