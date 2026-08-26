import { auth } from "@/lib/auth";
import { postspath } from "@/lib/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



interface AuthLayoutProps{
    children:React.ReactNode;
}
export default async function AuthLayout ({children}:AuthLayoutProps){
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
});

if(session){
    redirect(postspath)
}
    return(
        <>
        {children}
        </>
    )
}