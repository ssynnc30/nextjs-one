"use server"

import getSession from "@/lib/getSession";
import { loginPath } from "@/lib/path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


interface Props{
    postId:string,
    value:number
}

export default async function voteOnPost ({postId,value}:Props){
    const session=await getSession();
   if(!session?.user.id){ redirect(loginPath)};

   const userId=session.user.id;
   const existingVote=await prisma.vote.findUnique({
    where:{
        userId_postId:{
            userId,
            postId
        }
    }
   });

   if(existingVote?.value===value){
    await prisma.vote.delete({
        where:{
            id:existingVote.id
        }
    });
    return ;
   }
   

   if(existingVote){
    await prisma.vote.update({
        where:{
            id:existingVote.id,
        },
        data:{
            value,
        }
    })
    return;
   }

   await prisma.vote.create({
    data:{
        userId,
        postId,
        value
    }
   })
}