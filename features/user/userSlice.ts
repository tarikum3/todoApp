import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { firestoreApi } from '../../store/firestoreApi';
// import { ScoresTable, ScoresTables } from "../../types";

export const userApi = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      async queryFn({email,name,password}) {
        try {
  
          await addDoc(collection(firestore, "user"), {
            email: email,
            name: name,
            password: password,
            updatedAt:null,  
            createdAt: new Date().getTime(),
          });
          
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useCreateUserMutation } =userApi;

