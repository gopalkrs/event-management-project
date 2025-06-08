"use client"
import { fetchEvents } from '@/lib/queries/fetchEvents'
import { useQuery } from '@tanstack/react-query'
import { Loader, Loader2, LoaderPinwheel } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const Events = () => {

  const {data, isLoading, error} = useQuery({
    queryKey : ['events'],
    queryFn: fetchEvents,
  });

  console.log(data?.data?.data)

  if(isLoading) return <div className='min-h-screen flex justify-center items-center'><Loader className='animate-ping text-gray-800'/></div>

  return (
    <section className='min-h-screen flex flex-col items-center my-10 mx-5'>
      <Image src={data?.data?.data[2].image} width={500} height={500} alt={'event-img'} />
    </section>
  )
}

export default Events