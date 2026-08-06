import { aboutPath, homePath, postspath } from "@/lib/path";
import Link from "next/link";
import { ModeToggle } from "./theme-switch";


export default function Header (){

    return (
        <div className="flex justify-between items-center">
            <Link href={homePath} className="text-xl font-bold">LOGO</Link>
            <div className="flex items-center gap-5">
      <Link href={postspath}>posts</Link>
      <Link href={aboutPath}>about</Link>
      <ModeToggle/>
            </div>
        </div>
    )
}