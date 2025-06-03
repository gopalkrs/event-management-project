import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from "@/lib/database/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            // httpOptions: {
            //     timeout: 10000, // 10 seconds
            //   },
        }),
        // Github({
        //     clientId: process.env.GITHUB_CLIENT_ID || "",
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        // }),
    ],
    
    adapter: DrizzleAdapter(db),
    session: {
        strategy: "database",
    },
    // callbacks: {
    //     async signIn({ account }) {
    //         if (account && account.providerAccountId) {
    //           account.providerAccountId = String(account.providerAccountId); // 👈 Fix the type
    //         }
    //         return true;
    //       },

    //     async session({session, user}){
    //         session.user.id = user?.id;
    //         return session;
    //     }
    // },
    // pages: {
    //     error: "/auth/error", // your custom error page
    // }
})