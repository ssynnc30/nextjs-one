
import { aboutPath, homePath, loginPath, postspath, profilePath, registerPath } from "@/lib/path";
import Link from "next/link";
import { ModeToggle } from "./theme-switch";
import { Button } from "./ui/button";
import { logout } from "@/features/auth/actions/logout";
import getSession from "@/lib/getSession";
// import { authClient } from "@/lib/auth-client";


export default async  function  Header (){


const session=await getSession();
    
// const {data:session,isPending}=authClient.useSession()
    return (
        <div className="flex justify-between items-center my-8">
            <Link href={homePath} className="text-xl font-bold">LOGO</Link>
            <div className="flex items-center gap-5">
                {
                    session &&  <Link href={postspath}>My Posts</Link>
                }
     
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
       <div className="flex items-center gap-5">
        <Link href={profilePath}>Profile</Link>
         <form action={logout}>
            <Button type="submit" className="cursor-pointer">Logout</Button>
        </form>
       </div>
    )
}