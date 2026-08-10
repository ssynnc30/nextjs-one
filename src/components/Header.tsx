import { aboutPath, homePath, loginPath, postspath, registerPath } from "@/lib/path";
import Link from "next/link";
import { ModeToggle } from "./theme-switch";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { logout } from "@/features/auth/actions/logout";


export default async function Header (){


const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    
console.log(session)
    return (
        <div className="flex justify-between items-center my-8">
            <Link href={homePath} className="text-xl font-bold">LOGO</Link>
            <div className="flex items-center gap-5">
      <Link href={postspath}>Posts</Link>
      <Link href={aboutPath}>About</Link>
      {
        session? <LogoutButton/> : <LoginAndRegisterButton/>
      }
      <ModeToggle/>
            </div>
        </div>
    )
}



function LoginAndRegisterButton (){

    return(
        <div className="flex items-center gap-5">
        <Link href={loginPath}>
        <Button variant={"outline"}>Login</Button>
        </Link>

        <Link href={registerPath}>
        <Button>Register</Button>
        </Link>
        
        </div>
    )
}

function LogoutButton (){
    return(
        <form action={logout}>
            <Button type="submit" className="cursor-pointer">Logout</Button>
        </form>
    )
}