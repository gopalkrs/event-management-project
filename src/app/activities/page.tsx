"use client";
import { fetchActivitiesFilter } from '@/lib/queries/fetchEvents';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ActivitiesPage = () => {


  const { isPending, data, error } = useQuery({
    queryKey: ['fetchActivities'],
    queryFn: fetchActivitiesFilter,
  });

  //console.log(data?.data?.data);

  if (isPending) {
    return <div className='flex justify-center items-center h-screen'><Loader className='w-6 h-6 animate-spin' /></div>
  }

  return (
    <section className='min-h-screen flex flex-col my-10 xs:mx-10 mx-5'>
      <div className="">
        <div className='flex items-center gap-3 my-10'>
          <h2 className="text-xl font-bold text-gray-800">Sports Events For You</h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data?.data?.data?.map((event: any) => (
            <Link href={`/events/${event.id}`} key={event.id} className='flex flex-col rounded-lg border border-gray-200 shadow-sm text-gray-800 mb-4 pb-2'>
              <div className='relative w-full h-48'>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className='object-cover rounded-t-lg'
                />
              </div>
              <div className='text-left pt-2 pl-2'>
              <h3 className='text-md font-medium'>{event.title}</h3>
              <p className='text-xs text-gray-600'>{event.venue}, {event.city}</p>
              <p className='text-xs text-gray-600'>₹{event.eventPrice} onwards</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ActivitiesPage;