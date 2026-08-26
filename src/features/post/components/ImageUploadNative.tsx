// "use client";

// import { Button } from "@/components/ui/button"
// import { toast } from "@/components/ui/toast";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import imageCompression from "browser-image-compression";
// import { X } from "lucide-react";


// interface ImageUploadProps{
//     files:File[],
//     onChange:(files:File[])=>void,
//     maxFiles?:number,
//     error?:string
// }

// export default function ImageUpload ({files=[],onChange,maxFiles=4,error}:ImageUploadProps){
//     const [previews,setPreviews]=useState<string[]>([]);
// const inputRef=useRef<HTMLInputElement>(null);
// const [isCompressing,setIsCompressing]=useState(false);

// const handleFileChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{

//     // Validation Step 

//  const selectedFiles=Array.from(e.target.files || []);

// //  No files 

//  if(selectedFiles.length===0) return;

// //  Validate files count 

//  if(selectedFiles.length > maxFiles){
//     toast.add({
//         type: "error",
//             description: `U can choose max ${maxFiles} images`,
//     });
    
//     e.target.value="";
//     return
//  };

// //  Validate file type 

// const invalidFiles=selectedFiles.find((file)=>!file.type.startsWith("image/"));
// if(invalidFiles){
//     toast.add({
//         type:"error",
//         description:"Please select image files only."
//     });
//     e.target.value="";
//     return
// };

// // Compressing  Step

// try{

//     // Resize 

//     setIsCompressing(true);
//     const compressedFiles=await Promise.all(
//         selectedFiles.map((file)=> imageCompression(file,{
//             maxSizeMB:1,
//             maxWidthOrHeight:1920,
//             initialQuality:0.85,
//             useWebWorker:true
//         }))
//     )

//     // Update Files 

//     onChange([...files,...compressedFiles])


// }catch(err){
//     console.log("Image compression error:",err);
//     toast.add({
//         type:"error",
//         description:`Error: ${err}`
//     })
// }finally{
//     setIsCompressing(false);
//     e.target.value=""
// }

// };

// const handleRemoveImage=(index:number)=>{
//     const updatedFiles=files.filter((_,i)=>i !==index);
//     onChange(updatedFiles)
// }


// useEffect(()=>{
//     if(!files || files.length===0){
//         setPreviews([]);
//         return
//     }
// const newPreviews=files.map((file)=> URL.createObjectURL(file));
// setPreviews(newPreviews);

// return ()=>{
//     newPreviews.forEach((url)=>URL.revokeObjectURL(url))
// }
// },[files])
//     return (
//         <div>
//            <div className="flex items-center gap-3">
//              {
//                 previews.map((url)=>(
//                     <div key={url} className="relative w-20 h-20 aspect-square overflow-hidden rounded-lg flex items-center">
//                         <Image src={url} alt="Preview Images" fill unoptimized className="object-cover"/>
//                         <Button>
//                             <X></X>
//                         </Button>
//                     </div>
//                 ))
//             }
//             <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange}/>
//            </div>
            
//             <div className="pt-3">
//                 <Button  variant={"outline"} onClick={()=>{inputRef.current?.click()}} >
//                 {
//                     isCompressing ? "uploading..." : "image upload"
//                 }
//             </Button>
//             {
//                 error && <p className="text-sm text-red-500">{error}</p>
//             }
//             </div>
//         </div>
//     )
// }