import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { firestore } from "../../../firebase";
import { collection, onSnapshot, query, where,CollectionReference,getDocs } from "firebase/firestore";

export const authOptions: NextAuthOptions = {

 // adapter: FirebaseAdapter(firestore),
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "Your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      
      
      authorize: async (credentials)=> {

       

       // const ref = collection(firestore, "user")as CollectionReference<User>;
        const q = query(collection(firestore, "user"), where("email", "==", credentials.email),
        where("password", "==", credentials.password));
        //const querySnapshot = await getDocs(ref);
        const querySnapshot = await getDocs(q);
        let users: User[] = [];
        querySnapshot?.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() } as User);

        });
        if(users.length>0){ return {
          id: users[0].id,
          name: users[0].name,
          email: users[0].email,
        
        };}
       
      //  let temp=users.filter((use)=>{return use.email==credentials.email&&use.password==credentials.password})
      //      if(temp.length>0){ return {
      //       id: temp[0].id,
      //       name: temp[0].name,
      //       email: temp[0].email,
          
      //     };}
       
   
        throw new Error("Invalid Email or Passwordd");
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub!,
        },
      };
    },
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
