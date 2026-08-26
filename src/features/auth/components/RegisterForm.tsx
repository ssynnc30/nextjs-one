"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Controller, useForm } from "react-hook-form";
import { authRegisterSchema } from "../schemas";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { register } from "../actions/register";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { LoaderCircle } from "lucide-react";
import { loginPath } from "@/lib/path";
import Link from "next/link";
import GithubButton from "./GithubButton";
import { useRouter } from "next/navigation";



export default function RegisterForm(){

  const {execute,isPending,result} = useAction(register);
  const router=useRouter();


    const form = useForm<z.infer<typeof authRegisterSchema>>({
        resolver: zodResolver(authRegisterSchema),
        defaultValues: {
         name:"",
         email:"",
         password:"",
         confirmPassword:""
        },
      });

      function onSubmit(data: z.infer<typeof authRegisterSchema>) {
           const {name,email,password,confirmPassword}=data;
     execute({name,email,password,confirmPassword})
        };

         useEffect(()=>{
          const data=result.data;
    if(!data){
      return;
    }

    if(data?.success){
       form.reset();
        toast.add({
            type: "success",
            description: "Registered Successfully",
          });
          router.push(loginPath);
              
    };

     if(!data?.success){
        toast.add({
            type: "failed",
            description: data?.error,
          });
    }
  },[result])

    return(
        <Card>
        <CardHeader>
            <CardTitle>Register Form</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                 
                </Field>
              )}
            />

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


             <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input type="password"
                    {...field}
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please confirm your password."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                 
                </Field>
              )}
            />

                </FieldGroup>
                <Button className="my-5 w-full" type="submit" disabled={isPending}>
                             {
                        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Register")
                         }
                        </Button>
            </form>
            <hr className="my-4"/>
            <GithubButton/>
          
             <p className="text-sm text-muted-foreground font-medium">Already have an account? <Link href={loginPath} className="underline">Sign in</Link></p>
             
            
        </CardContent>
        </Card>
    )
}