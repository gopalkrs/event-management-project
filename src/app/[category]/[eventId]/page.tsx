"use client"
import { fetchAllEvents, fetchSingleEvent } from '@/lib/queries/fetchEvents'
import { useQuery } from '@tanstack/react-query'
import { Clock, Info, Languages, Loader } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { differenceInHours } from 'date-fns';
import EventDetailsCard from '@/components/events/EventDetailsCard';
import { notFound } from 'next/navigation';

const EventDetailsPage = ({ params } : { params: { eventId: string; category: string } }) => {

  const {category, eventId} = React.use(params);
console.log(eventId, category);
  const validCategories = ['events', 'party', 'sports', 'activity'];

  if (!validCategories.includes(category)) {
    notFound();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchSingleEvent', eventId],
    queryFn: ()=>fetchSingleEvent({eventId}),
  });

  console.log(data?.data.data[0]);

  if (isLoading) return <div className='min-h-screen flex justify-center items-center'><Loader className='animate-ping text-gray-800' /></div>

  return (
    <section className='min-h-screen gap-10 flex md:flex-row flex-col items-start my-10 mx-5 md:mx-20'>
      <div className='flex md:max-w-2xl flex-col w-full'>
        <div className="w-full">
          <Image
            src={data?.data?.data[0].image}
            alt="event-img"
            height={300}
            width={500}
            className="object-cover rounded-lg"
          />
        </div>
      
      <div className="w-full mt-10 ">
        <h2 className="text-xl font-bold mb-2 text-left">About the Event</h2>
        <p className="text-sm text-gray-700">{data?.data?.data[0].description || "About text goes here..."}</p>
      </div>
      <div className="w-full mt-10 ">
        <h2 className="text-xl font-bold mb-2 text-left">Event Guide</h2>
        <div className='flex sm:flex-row sm:items-center justify-between flex-col gap-5'>
          <div className='flex flex-row items-center gap-1'>
            <Clock className='h-10 w-10 text-gray-900 bg-gray-200 p-3 rounded-md' />
            <div className='flex flex-col'>
              <p className='text-sm text-gray-400'>Duration</p>
              <p className='text-sm'>{differenceInHours(new Date(data?.data?.data[0].endTime), new Date(data?.data?.data[0].startTime))} Hours</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <Languages className='h-10 w-10 text-gray-900 bg-gray-200 p-3 rounded-md' />
            <div className='flex flex-col'>
              <p className='text-sm text-gray-400'>Languages</p>
              <p className='text-sm'>English/Hindi</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <Info className='h-10 w-10 text-gray-900 bg-gray-200 p-3 rounded-md' />
            <div className='flex flex-col'>
              <p className='text-sm text-gray-400'>Entry allowed for</p>
              <p className='text-sm'>16 yrs and above</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full mt-10 '>
        <h2 className='text-xl font-bold mb-2 text-left'>Venue</h2>
        <div>
          <p className='text-sm text-gray-700'>{data?.data?.data[0].venue || "Venue details go here..."}</p>
        </div>
      </div>
      </div>
      <div className=''>
      <EventDetailsCard data={data?.data?.data[0]} />
      </div>
    </section>
  )
}

export default EventDetailsPage;