import ProfileOverview from "@/features/profile/components/ProfileOverview";
import getSession from "@/lib/getSession";
import { loginPath } from "@/lib/path";
import { redirect } from "next/navigation";
import { Suspense } from "react";




export default async function ProfilePage (){
const session=await getSession();

if(!session) {
    redirect(loginPath)
    
}

    return (
        <>
        <h1 className="text-center text-3xl font-bold my-5">User Profile Page</h1>
         <Suspense fallback={<p className="text-3xl text-red-400">Pending...</p>}>
             <ProfileOverview user={session?.user}/>
        </Suspense>
       
        </>
    )
}