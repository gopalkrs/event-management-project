"use client";
import EventCard from '@/components/common/EventCard';
import { fetchEventsFilter } from '@/lib/queries/fetchEvents';
import { useQuery } from '@tanstack/react-query';
import { Guitar, Loader, Mic, MicVocal, Wine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const EventPage = () => {

  const exploreItems = [
    {
      title: 'Concerts',
      source: '/music.svg',
      color: 'text-blue-100'
    },
    {
      title: 'Comedy',
      source: '/comedy.svg',
      color: 'text-yellow-100'
    },
    {
      title: 'Nightlife',
      source: '/nightlife.svg',
      color: 'text-purple-100'
    }
  ]

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['fetchEventsFilter'],
    queryFn: fetchEventsFilter,
  });

  //console.log(data?.data?.data);

  if (isPending) {
    return <div className='flex justify-center items-center h-screen'><Loader className='w-6 h-6 animate-spin' /></div>
  }

  return (
    <section className='min-h-screen flex flex-col my-10 xs:mx-10 mx-5'>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">Explore Events</h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      <div className='flex flex-row gap-2 sm:gap-5 my-10'>
        {exploreItems.map((item, index) => {
          return (
            <Link href={'/events/concerts'} key={index} className='flex flex-col px-1 sm:px-2 py-4 rounded-sm border bg-lime-100 text-gray-600 items-center'>
              <h3 className='text-sm font-medium'>{item.title}</h3>
              <Image src={item.source} alt='evt-type' width={50} height={50}/>
            </Link>
          )
        })}
      </div>
      <div className="">
        <div className='flex items-center gap-3 my-10'>
          <h2 className="text-xl font-bold text-gray-800">All Events</h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data?.data?.data?.map((event: any, ind: number) => (
            <EventCard key={ind} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventPage;