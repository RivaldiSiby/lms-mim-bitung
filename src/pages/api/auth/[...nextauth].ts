import { auth } from "@/firebase/config";
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
        return signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        )
          .then((userCredential) => {
            if (userCredential.user) return userCredential.user;
            console.log("err auth");
            return null;
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
      },
    }),
  ],
  secret: "12d1d1dg18dg78ghsahdghasdgh8u1h89h1d981y278d9yhhd1982dh8",
};

export default NextAuth(authOptions);
