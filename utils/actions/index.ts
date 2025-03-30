'use server';
import { redirect } from "next/navigation";
import { db } from "../db"
import { revalidatePath } from "next/cache"; 

export const createTodo = async (formData: FormData) => {

   const title = formData.get('title') as string;
   const description = formData.get('description') as string;
   const author = formData.get('author') as string;
   const category = formData.get('category') as string;


   const todo =  await db.todo.create({
    data: {title,description,author,category}
   })
}


export const getAllTodo = async () => {
   const data = await db.todo.findMany({});
   console.log(data); 
 };
 

export const removeTodo = async (formData: FormData) => {
   const todoID = formData.get("id") as string;
   if (!todoID) return;

   await db.todo.delete({
       where: { id: todoID }
   });
   revalidatePath("/");
} 

export const updateTodo = async (formData: FormData) => {
   const updateID = formData.get("updateid") as string;

   const title = formData.get("title") as string;
   const description = formData.get("description") as string;
   const author = formData.get("author") as string;
   const category = formData.get("category") as string;

   if (!updateID) return;

   await db.todo.update({
      where: { id: updateID },
      data: {
         title,
         description,
         author,
         category,
      },
   });

  
  revalidatePath('/'); // Refresh data
  redirect('/'); // Redirect to home page
};