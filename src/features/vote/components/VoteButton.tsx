"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { useState, useTransition } from "react"
import voteOnPost from "../actions/vote-on-post"

interface VoteButtonProps{
    postId:string,
    initialUserVote:number|null,
    initialScore:number
}
export default function VoteButton ({postId,initialUserVote,initialScore}:VoteButtonProps){
  const [userVote,setUserVote]=useState(initialUserVote);
  const [score,setScore]=useState(initialScore);
  const [isPending,startTransition]=useTransition();

  const handleVote=(value:number)=>{
    const prevVote=userVote;
    const prevScore=score;
    const newVote=userVote===value ? null : value;
    const preVoteValue=userVote || 0;
    const newVoteValue=newVote || 0;
    const scoreDiff=newVoteValue-preVoteValue;
  
   startTransition(async()=>{
     setScore((prev)=>prev+scoreDiff);
   setUserVote(newVote);
    try{
        await voteOnPost({postId,value});
    }catch(err){
        setScore(prevScore);
        setUserVote(prevVote);
        console.log("Vote Error Message:",err)
    }
   })
  }
    return(
        <>
        <div className="flex items-center gap-1">
            <Button
            onClick={()=>{handleVote(1)}}
            disabled={isPending}
             variant={"ghost"} size={"icon"} className={cn("h-8 w-8",userVote===1?"text-orange-500 hover:text-orange-600":"text-muted-foreground hover:text-foreground")}>
                <ArrowBigUp className={cn("h-6 w-6",userVote===1 && "fill-current")}/>
            </Button>
            <span className="text-center font-bold text-sm">{score}</span>
             <Button
             onClick={()=>{handleVote(-1)}}
            disabled={isPending}
             variant={"ghost"} size={"icon"} className={cn("h-8 w-8",userVote=== -1?"text-blue-500 hover:text-blue-600":"text-muted-foreground hover:text-foreground")}>
                <ArrowBigDown className={cn("h-6 w-6",userVote=== -1 && "fill-current")}/>
            </Button>
        </div>
        </>
    )
}