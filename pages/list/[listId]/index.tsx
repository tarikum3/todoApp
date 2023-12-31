
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState ,useEffect, FormEvent} from "react";
import { useCurrentUser } from "@lib/context";
import TodoComponent from "components/Todo";
import { notAuthorizedList } from "../../../lib/error";
import { useCreateTodoMutation ,useFindTodoQuery} from "features/todo/todoSlice";
import { useDeleteListMutation,useFindListQuery } from "features/list/listSlice";

function CreateDialog() {
  
  const user = useCurrentUser();
   const [modalOpen, setModalOpen] = useState(false);
   const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const router = useRouter();
 
   const [createTodo]=useCreateTodoMutation();
   const onSubmit = async (event: FormEvent) => {
     event.preventDefault();
 
     try {
   
      await createTodo({
       title,
       
     priority: priority,
     ownerId:user.id,listId :router.query.listId
     });
     } catch (err) {
       alert(`Failed to create Task: ${err}`);
       return;
     }
 
    
     setTitle("");
   
     setModalOpen(false);
   };
 
   return (
     <>
       <input
         type="checkbox"
         id="create-list-modal2"
         className="modal-toggle"
         checked={modalOpen}
         onChange={(e: ChangeEvent<HTMLInputElement>) => {
           setModalOpen(e.currentTarget.checked);
           setPriority("");
         }}
       />
       <div className="modal">
         <div className="modal-box">
           <h3 className="font-bold text-xl mb-8">Create a Task</h3>
           <form onSubmit={onSubmit}>
             <div className="flex flex-col space-y-4">
               <div className="flex items-center">
                 <label htmlFor="title" className="text-lg inline-block w-20">
                   Title
                 </label>
                 <input
                   id="title"
                   type="text"
                   required
                   placeholder="Title of your list"
                   className="input input-bordered w-full max-w-xs mt-2"
                   value={title}
                   onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                 />
               </div>
               <div className="flex items-center">
                 <label  className="text-lg inline-block w-20">
                   Priority
                 </label>
                 low
                 <input
                 placeholder="low"
                   id="private"
                   type="checkbox"
                   className="checkbox"
                   checked={"1"==priority?true:false}
                   onChange={(e: FormEvent<HTMLInputElement>) => setPriority("1")}
                 />
                   medium
                 <input
                 placeholder="low"
                   id="private"
                   type="checkbox"
                   className="checkbox"
                   checked={"2"==priority?true:false}
                   onChange={(e: FormEvent<HTMLInputElement>) => setPriority("2")}
                 />
                   high
                 <input
                 placeholder="low"
                   id="private"
                   type="checkbox"
                   className="checkbox"
                   checked={"3"==priority?true:false}
                   onChange={(e: FormEvent<HTMLInputElement>) => setPriority("3")}
                 />
               </div>
             </div>
             <div className="modal-action">
               <input className="btn btn-primary" type="submit" value="Create" disabled={!priority||!title} />
               <label htmlFor="create-list-modal2" className="btn btn-outline">
                 Cancel
               </label>
             </div>
           </form>
         </div>
       </div>
     </>
   );
 }



export default function TodoList() {
  const user = useCurrentUser();
  const router = useRouter();

  const [createTodo]=useCreateTodoMutation();
  const [title, setTitle] = useState("");
 
  const [sortBy, setSortBy] = useState("");
  
  const {data: lists}=useFindListQuery({ownerId:user.id});
  const currentlist =lists?.filter((item)=>item?.id==router.query.listId)[0];

  const {data: todos}=useFindTodoQuery({ listId:router.query.listId});

 function sortList(a, b){
  let x = ""+a[sortBy];
  let y = ""+b[sortBy];
  if (x.toLowerCase() < y.toLowerCase()) {return -1;}
  if (x.toLowerCase() > y.toLowerCase()) {return 1;}
  return 0;
}
function filterList(item){
  
  return item?.title.toUpperCase().indexOf(title.toUpperCase()) > -1;
}







 

  if (!currentlist) {
    return <p>Loading ...</p>;
  }



  return (
    <>
   <div className="">   
      <ul className="absolute left-[80%] pt-12">
       <li className="text-2xl font-semibold mb-4">Sort by</li>
       <li ><button className={sortBy=="title"?" p-1 underline":"p-1"}   onClick={()=>setSortBy("title")}>title</button></li>
       <li> <button  className={sortBy=="createdAt"?" p-1 underline":"p-1"} onClick={()=>setSortBy("createdAt")}>date  </button></li>
       <li><button className={sortBy=="priority"?" p-1 underline":"p-1"} onClick={()=>setSortBy("priority")}>priority</button></li>
        </ul></div>
   
      <div className="container w-full flex flex-col items-center pt-12">
       
       
    <h1 className="text-2xl font-semibold mb-4">{currentlist?.title}</h1>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="search task"
            className="input input-bordered w-72 max-w-xs mt-2"
            value={title}
        
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <button >
           
            <label htmlFor="create-list-modal2" className=" modal-button w-6 h-6 ">
            New task 
          </label>
          </button>
         
  
        </div>
        <ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
          {/* {todosview?.map((todo) => ( */}
          {todos?.filter(filterList).sort(sortList).map((todo) => (
            <TodoComponent
              key={todo.id}
              value={{...todo,owner:user}}
              updated={() => {
                
              }}
              deleted={() => {
               
              }}
            />
          ))}
        </ul>
        <CreateDialog />
      </div>
    </>
  );
}
