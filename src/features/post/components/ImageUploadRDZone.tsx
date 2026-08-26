"use client"
import  { useState} from "react";
import {useDropzone} from "react-dropzone";
import ImagePreview from "./ImagePreview";
import compressImage from "@/lib/compress-image";
import { LoaderCircle } from "lucide-react";

interface ImageUploadRDZoneProps{
    value:File[],
    onChange:(files:File[])=>void,
    isUploading:boolean,
    isPending:boolean
    
}

export default function ImageUploadRDZone({value=[],onChange,isUploading,isPending}:ImageUploadRDZoneProps) {
    // const [files,setFiles]=useState<File[]>([]);
    const [isCompressing,setIsCompressing]=useState(false);
    const Max_Files=4;
      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept:{
            "image/jpeg":[],
            "image/png":[],
            "image/webp":[],
        },
        multiple:true,
        maxFiles:Max_Files,
        maxSize:5*1024*1024,

        disabled:isCompressing || value.length >=Max_Files || isPending||isUploading,

        onDrop:async (acceptedFiles)=> {
            try{
                 setIsCompressing(true);
            const remainingSlots=Max_Files-value.length;
            const filesToAdd=acceptedFiles.slice(0,remainingSlots);
            const compressedFiles=await Promise.all(
           filesToAdd.map(async(file)=>{
            const compressed=await compressImage(file);
            if(!((compressed as any) instanceof File)){
                return new File([compressed],file.name,{
                    type:file.type || "image/jpeg",
                    lastModified:Date.now()
                })
            }
            return compressed
           })
                );

                
                 onChange?.([...value,...compressedFiles])
                }catch(err){
                    console.log(`ImageCompressingError:${err}`)
                }finally{
                    setIsCompressing(false)
                }   
            
        },

      });
  
      const removeFile=(indexToRemove:number)=>{
        const updatedFiles=value.filter((_,i)=>i!==indexToRemove);
        onChange(updatedFiles)
        //   setFiles((prev)=>
        // prev.filter((_,index)=> index !== indexToRemove)
        //   )
      };




  return (
    <div>
    {/* Drag and Drop Zone  */}
    <div {...getRootProps()} className="cursor-pointer rounded-lg border-2 border-dashed p-8 text-center">
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Image Upload</p>}
    </div>

    {/* Compressing Loading  */}
    {
        isCompressing && <LoaderCircle className="mx-auto size-6 animate-spin"/>
    }
    
    {/* Preview  */}
    <div className="flex items-center gap-3 py-3">
        {
            value.map((file,index)=>(
         <ImagePreview key={`${file.name}-${file.lastModified}`} file={file} onRemove={()=>removeFile(index)} isUploading={isUploading}  isPending={isPending}/>
            ))
        }
    </div>

    {/* {
        fileRejections.map((fileRejection)=>(
            <div key={fileRejection.file.name}>
          <p>{fileRejection.file.name}</p>
          {
            fileRejection.errors.map((err)=>(
                <p key={err.code}>{err.message}</p>
            ))
          }
            </div>
        ))
    } */}

    {
        value.length >= Max_Files && <p className="text-red-500">Maximum {Max_Files} images reached.</p>
    }

    </div>
    

  );
}