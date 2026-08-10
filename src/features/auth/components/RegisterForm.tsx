"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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



export default function RegisterForm(){

  const {execute,isPending,hasSucceeded,hasErrored} = useAction(register);


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
    if(hasSucceeded){
        form.reset();
        toast.add({
            type: "success",
            description: "Account created  successfully",
          });
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
                <Button className="my-5" type="submit" disabled={isPending}>
                             {
                        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Register")
                         }
                        </Button>
            </form>
        </CardContent>
        </Card>
    )
}