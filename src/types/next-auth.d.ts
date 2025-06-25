//import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    // interface Session{
    //     user: {
    //         id: string;
    //         name: string;
    //         email: string;
    //         image: string;
    //     }
    // }
    interface Session {
        user: {
          id: string; // <-- Your custom 'id' property
        } & DefaultSession["user"]; // <-- Merge with the default 'user' properties from NextAuth.js
      }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}