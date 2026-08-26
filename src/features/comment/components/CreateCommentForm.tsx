"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast"
import { createComment } from "../actions/create-comment";
import { CreateCommentSchema } from "../schemas/create-comment";
import { useParams } from "next/navigation";


export default function CreateCommentForm (){


    const {execute,isPending,hasSucceeded,hasErrored} = useAction(createComment);
    const params=useParams();

      const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
      postId: params.id as string
    },
  });


    function onSubmit(data: z.infer<typeof CreateCommentSchema>) {
    const {content,postId}=data;
     execute({content,postId});
     console.log(postId)
  };

  useEffect(()=>{
    if(hasSucceeded){
        form.reset();
        toast.add({
            type: "success",
            description: "Comment created  successfully",
          });
          

           if(hasErrored){
            toast.add({
                type: "failed",
                description: "Something Went Wrong. Comment failed !",
              });
        }
    }
  },[hasErrored,hasSucceeded])

    
    return (
        <Card>
                  <CardHeader>
                    {/* <CardTitle>Write Your Comment</CardTitle> */}
                  </CardHeader>
                  <CardContent>
                    <form id="create-comment-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

          
             <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="comment">
                  Review
                  </FieldLabel>
                  <Textarea
                   {...field}
                    id="comment"
                    aria-invalid={fieldState.invalid}
                    placeholder="Write your comment..."
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

