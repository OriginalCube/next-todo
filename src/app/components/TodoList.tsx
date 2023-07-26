'use client'

type TodoProps = {
  title: string;
  id: string;
  complete: boolean;
  toggleId : (id: string, complete : boolean) => void
  deleteId : (id: string) => void
};

export default function TodoList({ title, id, complete, toggleId , deleteId}: TodoProps) {
  return (
    <div className="w-full border-2 border-gray-800 p-2 mt-2">
      <form className="flex justify-start items-center gap-1"><input type="checkbox" id={id} className="w-1/3 peer cursor-pointer" defaultChecked={complete} onChange={e => toggleId(id, e.target.checked)}/>
      <label htmlFor={id} className="w-1/3 peer-checked:line-through cursor-pointer">
        {title}
      </label>
      <button onClick={()=>deleteId(id)} className="w-1/3 text-right">Delete</button>
    </form></div>
  );
}
