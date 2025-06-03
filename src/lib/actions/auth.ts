"use server"

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/auth"

export const logIn = async () =>{
    await signIn("google", {redirectTo: "/"})
}

export const logOut = async () =>{
    await signOut("google", {redirectTo: "/"})
}