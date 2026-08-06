import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });




export const fakePosts=[
{
    id:"1",
    title:"Spiderman",
    director:"Min Thant Ko",
    review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reiciendis obcaecati voluptatibus velit perspiciatis voluptatum cupiditate accusantium quibusdam deserunt saepe dolorem tempore quod quis inventore ipsa, recusandae molestiae ut ullam."
},
{
    id:"2",
    title:"Batman",
    director:"Aye Sandi Htun",
    review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reiciendis obcaecati voluptatibus velit perspiciatis voluptatum cupiditate accusantium quibusdam deserunt saepe dolorem tempore quod quis inventore ipsa, recusandae molestiae ut ullam."
},
{
    id:"3",
    title:"Venom",
    director:"Win Thazin",
    review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reiciendis obcaecati voluptatibus velit perspiciatis voluptatum cupiditate accusantium quibusdam deserunt saepe dolorem tempore quod quis inventore ipsa, recusandae molestiae ut ullam."
},
{
    id:"4",
    title:"Black Panther",
    director:"pauk Sa",
    review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reiciendis obcaecati voluptatibus velit perspiciatis voluptatum cupiditate accusantium quibusdam deserunt saepe dolorem tempore quod quis inventore ipsa, recusandae molestiae ut ullam."
},
{
    id:"5",
    title:"Hulk",
    director:"Nyan Lin Phyo",
    review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reiciendis obcaecati voluptatibus velit perspiciatis voluptatum cupiditate accusantium quibusdam deserunt saepe dolorem tempore quod quis inventore ipsa, recusandae molestiae ut ullam."
}
]



const seed=async ()=>{
    await prisma.post.deleteMany();
    await prisma.post.createMany({
        data:fakePosts
    });
    console.log("Database Seeded ...")
}

seed();