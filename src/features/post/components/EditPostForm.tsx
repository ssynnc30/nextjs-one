"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Post } from "../types/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePostSchema } from "../schemas";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "../actions/update-post";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { LoaderCircle } from "lucide-react";
import {useRouter } from "next/navigation";
import { postspath } from "@/lib/path";



interface EditPostFormProps{
    post:Post
}

export default function EditPostForm ({post}:EditPostFormProps){
const router=useRouter();
  const {execute,isPending,hasSucceeded,hasErrored} = useAction(updatePost);

  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: {
      id:post.id as string,
      title: post.title,
      director: post.director,
      review: post.review
    },
  });

  function onSubmit(data: z.infer<typeof UpdatePostSchema>) {
    execute({
      id:data.id,
      title:data.title,
      director:data.director,
      review:data.review
    })
  
  }

   useEffect(()=>{
    if(hasSucceeded){
        toast.add({
            type: "success",
            description: "Post updated  successfully",
          });

         router.push(postspath) 

      
    };

    if(hasErrored){
        toast.add({
            type: "failed",
            description: "Something Went Wrong.",
          });
    }
  },[hasErrored,hasSucceeded])
 

    return (
        <Card>
                  <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>This will be form.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form id="update-post-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                       <FieldGroup>

                         <Controller
              name="id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="hidden">
                  <FieldLabel htmlFor="id">
                    ID
                  </FieldLabel>
                  <Input
                    {...field}
                    id="id"
                    aria-invalid={fieldState.invalid}
                    placeholder="movie ID"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                 
                </Field>
              )}
            />
                      


                       <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="movie title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                 
                </Field>
              )}
            />


            <Controller
              name="director"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="director">
                    Director
                  </FieldLabel>
                  <Input
                    {...field}
                    id="director"
                    aria-invalid={fieldState.invalid}
                    placeholder="director's name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                
                </Field>
              )}
            />


            <Controller
              name="review"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="review">
                  Review
                  </FieldLabel>
                  <Textarea
                   {...field}
                    id="review"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please add your opinion."
                    autoComplete="off"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                
                </Field>
              )}
            />

                      </FieldGroup>
                       <Button className="my-5" type="submit" disabled={isPending}>
             {
        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Update")
         }
        </Button>
                    </form>
                  </CardContent>
                </Card>
    )
}


