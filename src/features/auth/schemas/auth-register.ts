import * as z from "zod";

export const authRegisterSchema = z.object({
  email:z.email(),
  password:z.string().min(10),
  name:z.string().min(3),
  confirmPassword:z.string().min(10)
}).superRefine(({password,confirmPassword},ctx)=>{
if(password!==confirmPassword){
    ctx.addIssue({
        code:"custom",
        message:"Password not match",
        path:["confirmPassword"]
    })
}
})