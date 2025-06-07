"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const ProfilePage = () => {

  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(login),
    defaultValues: {
      city: "",
      state: "",
      role: "",
      dob: "",
      mobile: "",
      country: "",
    },
  });

  const [open, setOpen] = useState(false);

  const updateUserHandler = async () => {
    // await updateUser(userdata);
    // await fetchIfUserLogged();
    setOpen(false)
    //window.location.reload();
  };

  return (
    <section className='px-8 py-10 min-h-screen flex flex-col relative'>
      <div className='flex sm:flex-row flex-col justify-center gap-2 items-stretch'> {/*used items stretch to make the heights same*/}
        <div className='flex flex-col bg-gray-800 shadow-sm rounded-md items-center justify-center gap-3 py-10 px-10'>
          {session && <Image className='rounded-full' width={100} height={100} src={session?.user?.image || ""} alt="profile_pic" />}
          <div className='space-y-1 text-center'>
            <h2 className='font-semibold text-lg text-gray-100'>{session?.user?.name}</h2>
            <p className='text-xs text-gray-400'>{session?.user?.email}</p>
          </div>
        </div>
        <div className='bg-gray-800 flex flex-col items-center text-gray-100 shadow-sm rounded-sm py-10 px-2 space-y-4'>
          <h2 className='font-semibold'>Additional Information</h2>
          <form className='px-2' onSubmit={handleSubmit(updateUserHandler)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Role */}
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm mb-1">Role</label>
                <input
                  type="text"
                  id="role"
                  placeholder="Organizer / Attendee"
                  className="p-2 outline-none text-sm text-gray-100 bg-gray-800 rounded"
                  {...register("role")}
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label htmlFor="city" className="text-sm mb-1">Address</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Mumbai"
                  className="p-2 outline-none text-sm text-gray-100 bg-gray-800 rounded"
                  {...register("city")}
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label htmlFor="dob" className="text-sm mb-1">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className="p-2 outline-none text-sm text-gray-100 bg-gray-800 rounded"
                  {...register("dob")}
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col">
                <label htmlFor="mobile" className="text-sm mb-1">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="+91 9876543210"
                  className="p-2 outline-none text-sm text-gray-100 bg-gray-800 rounded"
                  {...register("mobile")}
                />
              </div>

              {/* Occupation */}
              <div className="flex flex-col">
                <label htmlFor="state" className="text-sm mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  placeholder="Student / Developer"
                  className="p-2 outline-none text-sm text-gray-100 bg-gray-800 rounded"
                  {...register("state")}
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label htmlFor="country" className="text-sm mb-1">Country</label>
                <input
                  type="text"
                  id="country"
                  placeholder="India"
                  className="p-2 outline-none text-sm text-gray-100 bg-gray-800 rounded"
                  {...register("country")}
                />
              </div>
            </div>

            <Button className='' type="submit">Save changes</Button>
          </form>
        </div>
      </div>
      <div>

      </div>
      <Button className='z-100 fixed bottom-5 right-5'><Link href={'/events/create'}>Create Event</Link></Button>
    </section>
  )
}

export default ProfilePage;