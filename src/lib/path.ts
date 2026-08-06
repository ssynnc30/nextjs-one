export const homePath='/';
export const aboutPath='/about';
export const postspath='/posts';
export const detailsPostPath=(id:string|number)=>`${postspath}/${id}`;
export const editPostPath=(id:string|number)=>`${postspath}/${id}/editpost`;
