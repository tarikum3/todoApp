import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { firestore } from "../../../firebase";
import { collection, onSnapshot, query, where,CollectionReference,getDocs } from "firebase/firestore";

export const authOptions: NextAuthOptions = {

  adapter: FirebaseAdapter(firestore),
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
      
      //authorize: authorize(service),
      authorize: async (credentials)=> {
       // const q = query(collection(firestore, "user"), where('email', '==', credentials.email));
       

        const ref = collection(firestore, "user")as CollectionReference<User>;
        const querySnapshot = await getDocs(ref);
        let users: User[] = [];
        querySnapshot?.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() } as User);

        });
       
       let temp=users.filter((use)=>{return use.email==credentials.email&&use.password==credentials.password})
           if(temp.length>0){ return {
            id: temp[0].id,
            name: temp[0].name,
            email: temp[0].email,
          
          };}
        // onSnapshot(q, (querySnapshot) => {
          
        //   if(!querySnapshot.empty) {
        //     const user = querySnapshot.docs[0].data()
        //     // rest of your code 
           
        //     if (user && credentials.password== user.password) {
              
        //       return {
        //         id: user.id,
        //         name: user.name,
        //         email: user.email,
              
        //       };
        //     }
        //   }
       
         
        // });
   
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
