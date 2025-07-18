"use client";
import EventCard from '@/components/common/EventCard';
import { fetchActivitiesFilter } from '@/lib/queries/fetchEvents';
import { EVENT_TYPE } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React from 'react'

const ActivitiesPage = () => {


  const { isPending, data } = useQuery({
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
          <h2 className="text-xl font-bold text-gray-800 font-nunito">Explore Activities</h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data?.data?.data?.map((event: EVENT_TYPE, ind: number) => (
            <EventCard key={ind} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ActivitiesPage;