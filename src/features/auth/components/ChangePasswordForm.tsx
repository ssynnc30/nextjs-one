"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { LoaderCircle } from "lucide-react";
import { authResetPasswordSchema } from "../schemas/auth-reset-password";
import { resetPassword } from "../actions/reset-password";
import { authChangePasswordSchema } from "../schemas/auth-change-password";
import { changePassword } from "../actions/change-password";
import { notFound, useSearchParams } from "next/navigation";




export default function ChangePasswordForm(){

  const {execute,isPending,hasSucceeded,hasErrored} = useAction(changePassword);
  const serachParams=useSearchParams();
  const token=serachParams.get("token");

  if (!token) {
  return notFound()
}



    const form = useForm<z.infer<typeof authChangePasswordSchema>>({
        resolver: zodResolver(authChangePasswordSchema),
        defaultValues: {
         newPassword:"",
         token
        },
      });

      function onSubmit(data: z.infer<typeof authChangePasswordSchema>) {
           const {newPassword,token}=data;
     execute({newPassword,token})
        };

         useEffect(()=>{
    if(hasSucceeded){
        form.reset();
        toast.add({
            type: "success",
            description: "Your Password has changed.",
          });

    //    router.push(homePath)
    };

     if(hasErrored){
        toast.add({
            type: "failed",
            description: "Something Went Wrong.",
          });
    }
  },[hasErrored,hasSucceeded])

    return(
        <Card>
        <CardHeader>
            <CardTitle>Update Your Password.</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="newPassword">
                    New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="newpassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your new password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                 
                </Field>
              )}
            />

                </FieldGroup>
                <Button className="my-5" type="submit" disabled={isPending}>
                             {
                        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Change Password")
                         }
                        </Button>
            </form>
        </CardContent>
         
        </Card>
    )
}

