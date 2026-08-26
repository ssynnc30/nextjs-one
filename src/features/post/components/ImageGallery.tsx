
interface Props {
    image:string[]
}

export default function ImageGallery ({image}:Props){

    if(!image || image.length===0) return;

    if(image.length===1){
        return (
            <div className="border overflow-hidden rounded-xl mt-3">
                <img src={image[0]} alt="post image" className="w-full h-full object-cover max-h-[500px]" />
            </div>
        )
    }

     if(image.length===2){
        return (
            <div className="border overflow-hidden rounded-xl mt-3 grid grid-cols-2 gap-1 aspect-[2/1] sm:aspect-video">
                <img src={image[0]} alt="post image 1" className="w-full h-full object-cover" />
                <img src={image[1]} alt="post image 2" className="w-full h-full object-cover" />
            </div>
        )
    }

    if(image.length===3){
        return (
            <div className="border overflow-hidden rounded-xl mt-3 grid grid-cols-2 grid-rows-2 gap-1 aspect-[3/2] sm:aspect-video">
                <img src={image[0]} alt="post image 1" className="w-full h-full object-cover row-span-2" />
                <img src={image[1]} alt="post image 2" className="w-full h-full object-cover" />
                <img src={image[2]} alt="post image 3" className="w-full h-full object-cover" />
            </div>
        )
    }
    return (
        <div className="border overflow-hidden rounded-xl mt-3 grid grid-cols-2 grid-rows-2 gap-1 aspect-[3/2] sm:aspect-video">
                <img src={image[0]} alt="post image 1" className="w-full h-full object-cover" />
                <img src={image[1]} alt="post image 2" className="w-full h-full object-cover" />
                <img src={image[2]} alt="post image 3" className="w-full h-full object-cover" />
                <img src={image[3]} alt="post image 4" className="w-full h-full object-cover" />
            </div>
    )
}