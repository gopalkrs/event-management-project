import NextAuth, { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from "@/lib/database/db";

export const authOptions : NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID || "",
            clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
        })
    ],
    
    adapter: DrizzleAdapter(db),
    session: {
        strategy: "database",
    },
    callbacks: {
        async session({session, user}){
            session.user.id = user.id as string;
            return session;
        }
    }
};


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