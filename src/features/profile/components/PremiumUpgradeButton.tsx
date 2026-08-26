"use client";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createPremiumCheckout } from "../actions/create-premium-checkout";
import { toast } from "@/components/ui/toast";


export default function PremiumUpgradeButton (){
    const {execute,isPending}=useAction(createPremiumCheckout,{
        onSuccess:({data})=>{
     if(data.url){
        window.location.href=data.url
     }else{
        toast.add({
            description:"Unable to reach checkout link"
        })
     }
        },

        onError:()=>{
            toast.add({
                description:"Unable to reach checkout"
            })
        }

        
    })
    return(
        <div className="float-right">
        <Button onClick={()=>{execute({})}} disabled={isPending}>Buy Premium</Button>
        </div>
    )
}