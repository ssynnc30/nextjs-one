"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";




export default function SortingSelectBox (){
const searchParams=useSearchParams();
const pathName=usePathname();
const router=useRouter();

    const sortHandler=(value:string|null)=>{
        const params=new URLSearchParams(searchParams);
        if(value){
            params.set("sort",value)
        }else{
            params.delete("sort")
        };

        params.delete("page");
        
        router.replace(`${pathName}?${params.toString()}`,{
            scroll:false
        })
    }
    return (
        <div className="my-7">
        <Select value={searchParams.get("sort") ?? "desc"} onValueChange={sortHandler}>
  <SelectTrigger className="w-[180px]">
    <SelectValue>
        {
            searchParams.get("sort")==="asc" ? "Oldest" : "Newest"
        }
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="desc">Newest</SelectItem>
    <SelectItem value="asc">Oldest</SelectItem>
  </SelectContent>
</Select>
        </div>
    )
}