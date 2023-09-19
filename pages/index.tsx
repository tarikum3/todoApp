import { UserContext } from "@lib/context";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useDeleteListMutation,useFindListQuery,useCreateListMutation } from "features/list/listSlice";
import TodoList from "components/TodoList";
import { useCurrentUser } from "@lib/context";

function CreateDialog() {

 const user = useCurrentUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const [createList]=useCreateListMutation();
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
  
     await createList({
      title,
      ownerId: user!.id,
   
    });
    } catch (err) {
      alert(`Failed to create list: ${err}`);
      return;
    }

   
    setTitle("");
  
    setModalOpen(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="create-list-modal"
        className="modal-toggle"
        checked={modalOpen}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setModalOpen(e.currentTarget.checked);
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

            </div>
            <div className="modal-action">
              <input className="btn btn-primary" type="submit" value="Create" />
              <label htmlFor="create-list-modal" className="btn btn-outline">
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const user = useCurrentUser();

  const {data: lists}=useFindListQuery({ownerId:user.id});
 
  return (
    <>
      <div className="p-8">
        <div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="create-list-modal" className="btn btn-primary btn-wide modal-button">
            Create a list
          </label>
        </div>

        <ul className="flex flex-wrap gap-6">
          {lists?.map((list) => (
            <li key={list.id}>
              <TodoList  value={{...list,owner:user}}/>
            </li>
          ))}
        </ul>

        <CreateDialog />
      </div>
    </>
  );
}
