"use client"

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";


type Props={
    file:File,
    onRemove:()=>void,
    isUploading:boolean,
    isPending:boolean
}
export default function ImagePreview ({file,onRemove,isUploading,isPending}:Props){
const previewUrl=useMemo(()=>URL.createObjectURL(file),[file]);

useEffect(()=>{
    return ()=>{
        URL.revokeObjectURL(previewUrl)
    }
},[previewUrl])


    return(
        <div className="relative ">
            <Image src={previewUrl} alt={file.name} width={100} height={100} className="object-cover"/>
            <button disabled={isUploading||isPending} onClick={onRemove} className="absolute right-2 top-2 rounded-full bg-black/70 px-1 py-1 text-sm text-white cursor-pointer">
                <X className="size-4"/>
            </button>
        </div>
    )
}