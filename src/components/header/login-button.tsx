"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserIcon } from 'lucide-react';
//import { logIn } from '@/lib/actions/auth';
import { signIn } from 'next-auth/react';


const LoginButton = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className='text-center bg-gray-900 p-2 rounded-full'>
                        <UserIcon className='sm:h-5 sm:w-5 h-4 w-4 text-gray-300' />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    
                <DialogTitle>Sign In to continue</DialogTitle>
                    <div className="space-x-2">
                        <button className='border font-semibold rounded-sm border-gray-400 px-2 py-2 cursor-pointer bg-purple-400 text-white' onClick={() => signIn("google", { callbackUrl: "/" })}>Signin with Google</button>
                        {/* <button onClick={() => signIn("github")}>Signin with GitHub</button> */}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LoginButton