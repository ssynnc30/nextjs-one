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




export default function ResetPasswordForm(){

  const {execute,isPending,hasSucceeded,hasErrored} = useAction(resetPassword);



    const form = useForm<z.infer<typeof authResetPasswordSchema>>({
        resolver: zodResolver(authResetPasswordSchema),
        defaultValues: {
         email:"",
        },
      });

      function onSubmit(data: z.infer<typeof authResetPasswordSchema>) {
           const {email}=data;
     execute({email})
        };

         useEffect(()=>{
    if(hasSucceeded){
        form.reset();
        toast.add({
            type: "success",
            description: "Request password link sent in your email.",
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
            <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your email"
                    autoComplete="off"
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
                        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Submit")
                         }
                        </Button>
            </form>
        </CardContent>
         
        </Card>
    )
}

