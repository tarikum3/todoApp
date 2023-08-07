
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, KeyboardEvent, useState ,useEffect, FormEvent} from "react";
import { useCurrentUser } from "@lib/context";
import TodoComponent from "components/Todo";
import { notAuthorizedList } from "../../../lib/error";
import { useCreateTodoMutation ,useFindTodoQuery} from "features/todo/todoSlice";
import { useDeleteListMutation,useFindListQuery } from "features/list/listSlice";

function CreateDialog() {
  // const user = useContext(UserContext);
  const user = useCurrentUser();
   const [modalOpen, setModalOpen] = useState(false);
   const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const router = useRouter();
  // const { create } = useList();
   const [createTodo]=useCreateTodoMutation();
   const onSubmit = async (event: FormEvent) => {
     event.preventDefault();
 
     try {
       // await create({
       //   data: {
       //     title,
       //     ownerId: user!.id,
       //     private: _private,
       //   },
       // });
      await createTodo({
       title,
       
     priority: priority,
     ownerId:user.id,listId :router.query.listId
     });
     } catch (err) {
       alert(`Failed to create Task: ${err}`);
       return;
     }
 
     // reset states
     setTitle("");
     // setPrivate(false);
 
     // close modal
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
           <h3 className="font-bold text-xl mb-8">Create a Todo list</h3>
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
  //const { get: getList } = useList();
  const {data: lists}=useFindListQuery();
  //const { create: createTodo, find: findTodos } = useTodo();
  const [createTodo]=useCreateTodoMutation();
  const [title, setTitle] = useState("");
  const [todosview, setTodosview] = useState([]);
  const [sortBy, setSortBy] = useState("");
  //const { data: list } = getList(router.query.listId as string);
  const list =lists?.filter((item)=>item?.id==router.query.listId)[0];
  const {data: todos}=useFindTodoQuery();
  const listtodos =todos?.filter((item)=>item?.listId==router.query.listId);

  useEffect(() => {
if(listtodos?.length>0&&title==""){
  setTodosview(listtodos);

}
if(title!=""){
  //filter = input.value.toUpperCase();
  setTodosview(listtodos?.filter((item)=>item?.title.toUpperCase().indexOf(title.toUpperCase()) > -1));

}

  },[listtodos,title])
  useEffect(() => {
    if(sortBy!=""){
      
      todosview.sort(function(a, b){
        let x = ""+a[sortBy];
        let y = ""+b[sortBy].toLowerCase();
        if (x.toLowerCase() < y.toLowerCase()) {return -1;}
        if (x.toLowerCase() > y.toLowerCase()) {return 1;}
        return 0;
      });
    }
    if(sortBy=="title"){
     
    
    }
    
      },[sortBy])

  if (!list) {
    return <p>Loading ...</p>;
  }

  const _createTodo = async () => {
    try {
      // const todo = await createTodo({
      //   data: {
      //     title,
      //     ownerId: user!.id,
      //     listId: list!.id,
      //   },
      // });
      const todo = await createTodo({title:title, ownerId:user.id,listId :list.id});
        
      
     // console.log(`Todo created: ${todo}`);
      setTitle("");
    } catch (error: any) {
      if (error.status == 403) {
        notAuthorizedList();
      }
    }
  };

  return (
    <>
   <div className="">   
      <ul className="absolute left-[80%] pt-12">
       <li className="text-2xl font-semibold mb-4">Sort by</li>
       <button className={sortBy=="title"?"":""} onClick={()=>setSortBy("title")}>title</button>
       <li className="bg-blue-400" onClick={()=>setSortBy("createdAt")}>date </li>
       <li className="list p-1" onClick={()=>setSortBy("priority")}>priority</li>
        </ul></div>
   
      <div className="container w-full flex flex-col items-center pt-12">
       
       
    <h1 className="text-2xl font-semibold mb-4">{list?.title}</h1>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="search task"
            className="input input-bordered w-72 max-w-xs mt-2"
            value={title}
            // onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            //   if (e.key === "Enter") {
            //     _createTodo();
            //   }
            // }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <button >
            {/* <PlusIcon className="w-6 h-6 text-gray-500" /> */}
            <label htmlFor="create-list-modal2" className=" modal-button w-6 h-6 ">
            New task 
          </label>
          </button>
          {/* <div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="create-list-modal2" className="btn btn-primary btn-wide modal-button">
            
          </label>
        </div> */}
  
        </div>
        <ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
          {todosview?.map((todo) => (
            <TodoComponent
              key={todo.id}
              value={{...todo,owner:user}}
              updated={() => {
                // invalidateTodos();
              }}
              deleted={() => {
                // invalidateTodos();
              }}
            />
          ))}
        </ul>
        <CreateDialog />
      </div>
    </>
  );
}
