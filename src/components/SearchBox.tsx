"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from 'use-debounce';



export default function SearchBox (){
   const searchParams=useSearchParams();
   const pathName=usePathname();
   const router=useRouter();


   const searchHandler=useDebouncedCallback(
(e:React.ChangeEvent<HTMLInputElement> | undefined)=>{
const value=e?.target.value;
const params=new URLSearchParams(searchParams);

if(value){
    params.set("search",value)
}else{
    params.delete("search")
};
params.delete("page");

router.replace(`${pathName}?${params.toString()}`,{scroll:false})
   },500
   )

    return (
        <>
        <Input type="text" placeholder="Search posts" onChange={searchHandler} defaultValue={searchParams.get("search")?searchParams.get("search")?.toString():""}/>
        </>
    )
}