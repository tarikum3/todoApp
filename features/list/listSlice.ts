import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  deleteDoc,
  CollectionReference,
  doc,
  updateDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { firestoreApi } from '../../store/firestoreApi';
// import { ScoresTable, ScoresTables } from "../../types";

export const listApi = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    findList: builder.query<List[], void>({
      async queryFn() {
        try {
          const ref = collection(firestore, "list")as CollectionReference<List>;;
          const querySnapshot = await getDocs(ref);
          let lists: List[] = [];
          querySnapshot?.forEach((doc) => {
            lists.push({ id: doc.id, ...doc.data() } as List);
          });
          return { data: lists };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["List"],
    }),
    createList: builder.mutation({
      async queryFn({ title, ownerId }) {
        try {
  
          await addDoc(collection(firestore, "list"), {
            ownerId: ownerId,
            title: title,
            updatedAt:new Date().getTime(), 
            createdAt: new Date().getTime(),
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["List"],
    }),
 
    deleteList: builder.mutation({
      async queryFn({ id}) {
        try {
          const listRef = doc(firestore, "list", id);
          await deleteDoc(listRef);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["List"],
    }),
  }),
});

export const { useDeleteListMutation, useCreateListMutation , useFindListQuery  } =
  listApi;
