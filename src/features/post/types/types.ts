

export interface Post{
    id:string|number,
    title:string,
    director:string,
    review:string
}

export interface SearchParams{
  search?:string | undefined;
  sort?:string | undefined;
  page?:number;
  limit?:number;
  tag?:string|undefined
}





