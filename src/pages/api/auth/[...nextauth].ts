import { auth } from "@/firebase/config";
import { getUserData } from "@/firebase/firestore/user";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  pages: { login: "/login" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          if (userCredential.user) {
            const user: any = userCredential.user;
            const res = await getUserData(user.email);
            const dataUser = {
              email: user.email,
              name: res,
            };
            return dataUser;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: "12d1d1dg18dg78ghsahdghasdgh8u1h89h1d981y278d9yhhd1982dh8",
};

export default NextAuth(authOptions);
