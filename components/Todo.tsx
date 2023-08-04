import { TrashIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useState } from "react";
import { notAuthorizedList } from "../lib/error";
import Avatar from "./Avatar";
import TimeInfo from "./TimeInfo";
import { useUpdateTodoMutation ,useDeleteTodoMutation} from "features/todo/todoSlice";

// type Props = {
//   value: Todo & { owner: User };
//   updated?: (value: Todo) => any;
//   deleted?: (value: Todo) => any;
// };
type Props = {
  value: Todo & { owner: {id:string,name:string,email:string,image?:string} };
  updated?: (value: Todo) => any;
  deleted?: (value: Todo) => any;
};
export default function Component({ value, updated, deleted }: Props) {
  const [completed, setCompleted] = useState(!!value.completedAt);
  //const { update, del } = useTodo();
  const [updateTodo]=useUpdateTodoMutation();
  const [deleteTodo]=useDeleteTodoMutation();
  useEffect(() => {
    if (!!value.completedAt !== completed) {
      // update(value.id, {
      //   data: { completedAt: completed ? new Date() : null },
      // })
      //   .then((newValue: any) => {
      //     if (updated && newValue) {
      //       updated(newValue);
      //     }
      //   })
      //   .catch((error: any) => {
      //     notAuthorizedList();
      //     setCompleted(!completed);
      //   });
      updateTodo({id:value.id,data: { completedAt: completed ? new Date() : null }}).catch((error: any) => {
        notAuthorizedList();
        setCompleted(!completed);
      });
    }
  });

  const delTodo = async () => {
    try {
      //await del(value.id);
      deleteTodo({id:value.id});
      if (deleted) {
        deleted(value);
      }
    } catch (error: any) {
      notAuthorizedList();
    }
  };

  return (
    <div className="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center w-full lg:w-[480px]">
      <div className="flex justify-between w-full mb-4">
        <h3
          className={`text-xl line-clamp-1 ${
            value.completedAt ? "line-through text-gray-400 italic" : "text-gray-700"
          }`}
        >
          {value.title}
        </h3>
        <div className="flex">
          <input
            type="checkbox"
            className="checkbox mr-2"
            checked={completed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompleted(e.currentTarget.checked)}
          />
          <TrashIcon
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={() => {
              delTodo();
            }}
          />
        </div>
      </div>
      <div className="flex justify-end w-full space-x-2">
        <TimeInfo value={value} />
        <Avatar user={value.owner} size={18} />
      </div>
    </div>
  );
}
