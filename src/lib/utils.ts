import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getBaseUrl=()=>{
  const env=process.env.NODE_ENV;

  const baseUrl=env==="development"?"http://localhost:3000/" : "http://domain.com/";

  return baseUrl
}