import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { firestoreApi } from '../../store/firestoreApi';
// import { ScoresTable, ScoresTables } from "../../types";

export const todoApi = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    findTodo: builder.query<Todo[], void>({
      async queryFn() {
        try {
          
          const ref = collection(firestore, "todo")as CollectionReference<Todo>;
          const querySnapshot = await getDocs(ref);
          let todos: Todo[] = [];
          querySnapshot?.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() } as Todo);
          });
          return { data: todos };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation({
      async queryFn({ title, ownerId,listId,priority }) {
        try {
  
          await addDoc(collection(firestore, "todo"), {
            ownerId: ownerId,
            title: title,
            listId: listId,
            priority:priority,
            completedAt:null,
            updatedAt:new Date().getTime(),  
            createdAt: new Date().getTime(),
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      async queryFn({ id, data }) {
        try {
          const todoRef = doc(firestore, "todo", id);
          await updateDoc(todoRef, {
            ...data
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      async queryFn({ id}) {
        try {
          const todoRef = doc(firestore, "todo", id);
          await deleteDoc(todoRef);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useDeleteTodoMutation, useUpdateTodoMutation, useCreateTodoMutation , useFindTodoQuery  } =
todoApi;
