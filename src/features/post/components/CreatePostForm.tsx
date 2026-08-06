"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { CreatePostSchema } from "../schemas";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { createPost } from "../actions/create-post";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast"


export default function CreatePostForm (){


    const {execute,isPending,hasSucceeded,hasErrored} = useAction(createPost);

      const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      director: "",
      review: ""
    },
  });


    function onSubmit(data: z.infer<typeof CreatePostSchema>) {
    const {title,director,review}=data;
     execute({title,director,review})
  };

  useEffect(()=>{
    if(hasSucceeded){
        form.reset();
        toast.add({
            type: "success",
            description: "Post created  successfully",
          });
    }
  },[hasErrored,hasSucceeded])

    
    return (
        <Card>
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form id="create-post-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

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
        isPending ? (<LoaderCircle className="animate-spin h-4 w-4"/>) : ("Create")
         }
        </Button>
         
        </form>
                  </CardContent>
                </Card>
    )
}

