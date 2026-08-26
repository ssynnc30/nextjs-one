export const homePath='/';
export const aboutPath='/about';
export const postspath='/posts';
export const detailsPostPath=(id:string|number)=>`${postspath}/${id}`;
export const editPostPath=(id:string|number)=>`${postspath}/${id}/editpost`;
export const registerPath="/auth/register";
export const loginPath="/auth/login";
export const resetPasswordPath="/auth/reset-password";
export const changePasswordPath="/auth/change-password";
export const profilePath=`/profile`;

