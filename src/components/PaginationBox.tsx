"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface Props{
    totalPages:number
}

export default function PaginationBox({totalPages}:Props) {
    const searchParams=useSearchParams();
    const pathName=usePathname();
    const router=useRouter();

    const currentPage=Number(searchParams.get("page")) || 1;

    const handlePageChange=(newPage:number)=>{
  const params=new URLSearchParams(searchParams);

  if(newPage >1){
    params.set("page",newPage.toString())
  }else{
    params.delete("page")
  };

  router.replace(`${pathName}?${params.toString()}`,{scroll:false})};

  if(totalPages<=1){
    return null
  }
  const pages=[];

  for(let page=1;page<=totalPages;page++){
    pages.push(page)
  }
    

    
  return (
    <div className="py-5">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={(e)=>{
              e.preventDefault();
              if(currentPage>1){handlePageChange(currentPage-1)}
          }} className={currentPage===1? "pointer-events-none opacity-50":''} />
        </PaginationItem>
       {
        pages.map((page)=>(
            <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page===currentPage} onClick={(e)=>{e.preventDefault();handlePageChange(page)}}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        ))
       }
        <PaginationItem>
          <PaginationNext href="#" onClick={(e)=>{
              e.preventDefault();
              if(currentPage<totalPages){handlePageChange(currentPage+1)}
          }}
          className={currentPage===totalPages? "pointer-events-none opacity-50":''} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  )
}
