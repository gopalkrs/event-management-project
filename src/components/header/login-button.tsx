"use client"
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserIcon } from 'lucide-react';
import { logIn } from '@/lib/actions/auth';


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
                    <div className="space-x-2">
                        <button onClick={() => logIn()}>Signin with Google</button>
                        {/* <button onClick={() => signIn("github")}>Signin with GitHub</button> */}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LoginButton