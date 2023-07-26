import Link from "next/link";
import { prisma } from "@/db";
import TodoList from "./components/TodoList";
import {redirect} from 'next/navigation'

async function toggleId(id:string , complete: boolean) {
  'use server'
  await prisma.todo.update({where : {id}, data: {complete}})
}

async function deleteId(id:string){
  'use server'
  await prisma.todo.delete({where : {id}});
  redirect('/')
}

export default async function Main() {
  const todos = await prisma.todo.findMany(); 
  return (
    <>
      <header className="flex justify-start items-center mb-4 w-full">
        <h1 className="text-4xl w-full font-light">Todos</h1>
        <Link className="text-2xl font-light border-2 border-gray-800 p-4 px-8 rounded-md 
        hover:bg-gray-800 hover:text-white" href={"/new"}>New</Link>
      </header>
      <div className="h-auto w-full flex justify-center items-center">
        <div className="h-auto w-full md:w-1/3">
          {todos.map(todo =>(
            <TodoList key={todo.id} {...todo} toggleId={toggleId} deleteId={deleteId} />
          ))}
        </div>
      </div>
    </>
  );
}
