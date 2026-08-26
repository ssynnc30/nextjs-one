import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfileOverview } from "../queries/getProfileOverview"
import { Badge } from "@/components/ui/badge"
import { Crown, FileText } from "lucide-react"
import Link from "next/link"
import { postspath } from "@/lib/path"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import PremiumUpgradeButton from "./PremiumUpgradeButton"



interface ProfileOverviewProps{
    user:{
        id:string,
        name:string,
        email:string,
        image?:string | null
    }
}

export default async function ProfileOverview ({user}:ProfileOverviewProps){
const {isPremium,postsCount,commentsCount,premiumExpiresAt,premiumAmount,premiumCurrency,premiumLastPaymentAt}=await getProfileOverview(user.id);

const formattedExpiry=premiumExpiresAt? new Intl.DateTimeFormat("en-US",{dateStyle:"medium"}).format(premiumExpiresAt) : "N/A";
const formattedLastPayment=premiumLastPaymentAt? new Intl.DateTimeFormat("en-US",{dateStyle:"medium"}).format(premiumLastPaymentAt) : "N/A";
const formattedPayment=premiumAmount&&premiumCurrency ? new Intl.NumberFormat("en-US",{style:"currency",currency:premiumCurrency.toUpperCase()}).format(premiumAmount):"N/A";

console.log(formattedExpiry,formattedLastPayment,formattedPayment)
    return (
       <main>
       <div className="flex items-center gap-5 border rounded-2xl p-6 justify-between">
           <div className="flex items-center gap-4">
             <Avatar>
            <AvatarImage src={user.image ?? undefined} alt={user.name}/>
            <AvatarFallback>
                {
                    user.name.charAt(0).toUpperCase() ?? "U"
                }
            </AvatarFallback>
            </Avatar>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
                    {
                        isPremium && (
                            <Badge className="border bg-amber-500 text-black cursor-pointer">
                                <Crown className="mr-1 h-3 w-3"/>Premium
                            </Badge>
                        )
                    }
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
           </div>
            <div>
             <Link href={postspath}>
             <Button variant={"outline"}>View My Posts</Button>
             </Link>
            </div>
        </div>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-5">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Posts</CardTitle>
                    <FileText className="w-4 h-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{postsCount}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Comments</CardTitle>
                    <FileText className="w-4 h-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{commentsCount}</p>
                </CardContent>
            </Card>
        </div>
       <Card>
        <CardHeader>Membership</CardHeader>
        <CardContent >
            <div className="flex items-center justify-between rounded-md border p-3 my-5 ">
                <span>Plan</span>
                <span>{isPremium?"Premium Member":"Free Member"}</span>
            </div>

              <div className="flex items-center justify-between rounded-md border p-3 my-5">
                <span>Expired</span>
                <span>{formattedExpiry}</span>
            </div>

              <div className="flex items-center justify-between rounded-md border p-3 my-5">
                <span>Last Payment</span>
                <span>{formattedLastPayment}</span>
            </div>

              <div className="flex items-center justify-between rounded-md border p-3 my-5">
                <span>Amount</span>
                <span>{formattedPayment}</span>
            </div>

            {
                (!isPremium)? <PremiumUpgradeButton/> : null
            }
            
        </CardContent>
       </Card>
       </main>
    )
}