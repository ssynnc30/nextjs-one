"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Controller, useForm } from "react-hook-form";
import { authLoginSchema} from "../schemas";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { LoaderCircle } from "lucide-react";
import { login } from "../actions/login";
import { useRouter } from "next/navigation";
import { homePath } from "@/lib/path";



export default function LoginForm(){

  const {execute,isPending,hasSucceeded,hasErrored} = useAction(login);
//   const router=useRouter();


    const form = useForm<z.infer<typeof authLoginSchema>>({
        resolver: zodResolver(authLoginSchema),
        defaultValues: {
         email:"",
         password:""
        },
      });

      function onSubmit(data: z.infer<typeof authLoginSchema>) {
           const {email,password}=data;
     execute({email,password})
        };

         useEffect(()=>{
    if(hasSucceeded){
        form.reset();
        toast.add({
            type: "success",
            description: "Signed-in successfully",
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
            <CardTitle>Register Form</CardTitle>
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

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input type="password"
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your password"
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
                        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Login")
                         }
                        </Button>
            </form>
        </CardContent>
        </Card>
    )
}