import Link from 'next/link';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';

async function createTodo(data:FormData){
  "use server"
  const getTitle = await data.get("title")?.valueOf();
  if(typeof getTitle !== "string" || getTitle.length === 0){
    throw new Error("Invalid Inputs...");
  } 
  await prisma.todo.create({data: {title: getTitle, complete: false}})
  redirect('/')
}

export default function New() {
  return (
    <>
      <header className="flex justify-evenly items-center mb-4 w-full">
        <h1 className="text-4xl w-full font-light">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col w-5/6 m-auto">
        <input
        placeholder='enter todo here...'
          type="text"
          name="title"
          className="border-2 border-gray-800 p-4 focus:border-gray-600 outline-none rounded-md"
        />
        <div className='flex gap-1 justify-end'>
          <Link className='border-2 border-gray-800 p-2 px-4 rounded-md hover:bg-gray-800 hover:text-white' href={'..'}>Cancel</Link>
          <button className='border-2 border-gray-800 p-2 px-4 rounded-md hover:bg-gray-800 hover:text-white'>Create</button>
        </div>
      </form>
    </>
  );
}
