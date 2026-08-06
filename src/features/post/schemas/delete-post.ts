import * as z from "zod";

export const DeletePostSchema = z.object({
    id:z.string()
});