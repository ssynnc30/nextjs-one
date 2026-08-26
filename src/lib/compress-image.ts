import imageCompression from "browser-image-compression";


export default async function compressImage(file:File){
    const options={
    maxSizeMB:1,
    maxWidthOrHeight:1920,
    useWebWorker:true
    };

    return await imageCompression(file,options);
    
}