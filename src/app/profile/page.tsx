"use client"
import { Button } from '@/components/ui/button';
import { PROFILE_TYPE } from '@/types/types';
import axios from 'axios';
import { LoaderCircle, Pen } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileDetails } from '@/lib/queries/fetchProfile';

const ProfilePage = () => {

  const { data: session, status } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ['fetchProfileDetails', session?.user?.id],
    queryFn: () => fetchProfileDetails({ userId: session?.user?.id || "" }),
    enabled: !!session?.user?.id, // Only run query if userId is available
  });

  //console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    // watch,
    // formState: { errors },
  } = useForm<PROFILE_TYPE>({
    // resolver: zodResolver(login),
    defaultValues: {
      city: "",
      state: "",
      gender: undefined,
      dob: "",
      role: undefined,
      country: "",
      userId: "",
    },
  });

  const [editOpen, setEditOpen] = useState(false);

  //console.log(editOpen);
  useEffect(() => {
    if (data) {
      reset({
        city: data?.data?.data[0].city || "",
        state: data?.data?.data[0].state || "",
        gender: data?.data?.data[0].gender || undefined,
        dob: data?.data?.data[0].dob || "",
        role: data?.data?.data[0].role || undefined,
        country: data?.data?.data[0].country || "",
      })
    }
  }, [data, reset]);



  const onProfileSubmitHandler = async (payloadData: PROFILE_TYPE) => {

    const completePayload = {
      ...payloadData,
      userId: session?.user?.id || ""
    }

    console.log(completePayload);

    const res = await axios.post(`/api/profile`, completePayload);
    console.log(res);
    setEditOpen(false);

    //window.location.reload();
  };

  if (status === "loading" || isLoading) return <div className='min-h-screen flex justify-center items-center'><LoaderCircle className='animate-spin ' /></div>


  return (
    <section className='px-8 py-10 min-h-screen flex flex-col relative'>
      <div className='flex sm:flex-row flex-col justify-center gap-2 items-stretch'> {/*used items stretch to make the heights same*/}
        <div className='flex flex-col bg-purple-50 border border-red-100 rounded-md items-center justify-center gap-3 py-10 px-10'>
          {session && <Image className='rounded-full' width={100} height={100} src={'/male.svg'} alt="profile_pic" />}
          <div className='space-y-1 text-center'>
            <h2 className='font-semibold text-lg text-gray-600'>{session?.user?.name}</h2>
            <p className='text-xs text-gray-500'>{session?.user?.email}</p>

          </div>
          <div className='flex flex-row gap-3 justify-around'>
            <button onClick={() => signOut({ callbackUrl: "/" })} className='bg-purple-500 px-3 py-1 text-sm rounded-sm font-medium text-gray-50 cursor-pointer'>Logout</button>
            <button disabled={editOpen} onClick={() => setEditOpen(true)} className='border border-gray-300 px-3 py-1 flex flex-row items-center gap-1 text-sm rounded-sm cursor-pointer font-medium text-gray-800'>Edit <Pen className='w-4 h-4' /></button>
          </div>
        </div>
        <div className='bg-purple-50 border border-red-100 flex flex-col items-center text-gray-500 rounded-sm py-10 px-2 space-y-4'>
          <h2 className='font-semibold'>Additional Information</h2>
          <form className='px-2' onSubmit={handleSubmit(onProfileSubmitHandler)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Role */}
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm mb-1">Gender</label>
                <Select disabled={!editOpen} onValueChange={(value) => setValue("gender", value as PROFILE_TYPE['gender'])}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label htmlFor="city" className="text-sm mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  disabled={!editOpen}
                  className="p-2 outline-none text-sm text-gray-500 border border-gray-200 rounded"
                  {...register("city")}
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label htmlFor="dob" className="text-sm mb-1">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  disabled={!editOpen}
                  className="p-2 outline-none text-sm text-gray-500 border border-gray-200 rounded"
                  {...register("dob")}
                />
              </div>

              {/* Mobile */}
              {/* <div className="flex flex-col">
                <label htmlFor="role" className="text-sm mb-1">Role</label>
                <input
                  type="tel"
                  id="role"
                  placeholder="Admin / User"
                  className="p-2 outline-none text-sm text-gray-500 border border-gray-200 rounded"
                  {...register("role")}
                />
              </div> */}

              {/* Occupation */}
              <div className="flex flex-col">
                <label htmlFor="state" className="text-sm mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  disabled={!editOpen}
                  className="p-2 outline-none text-sm text-gray-500 border border-gray-200 rounded"
                  {...register("state")}
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label htmlFor="country" className="text-sm mb-1">Country</label>
                <input
                  type="text"
                  id="country"
                  disabled={!editOpen}
                  className="p-2 outline-none text-sm text-gray-500 border border-gray-200 rounded"
                  {...register("country")}
                />
              </div>
            </div>

            <Button disabled={!editOpen} className='bg-purple-500 hover:bg-purple-400 my-5 rounded-sm' type="submit">Save changes</Button>
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