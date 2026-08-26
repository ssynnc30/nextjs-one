import { Prisma} from "@/generated/prisma/client";


export type CommentsWithUsername=Prisma.CommentGetPayload<{
    include:{
        user:true
    }
}>