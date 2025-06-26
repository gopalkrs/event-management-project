"use client";

import { fetchRecentMusicEvents } from '@/lib/queries/fetchEvents';
import React, { useState } from 'react'
import EventCard from '../common/EventCard';
import { useQuery } from '@tanstack/react-query';
import { EVENT_TYPE } from '@/types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LiveEvents = () => {

  const { isPending, data } = useQuery({
    queryKey: ['fetchRecentMusicEvents'],
    queryFn: fetchRecentMusicEvents,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? data?.data?.data?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((next) => (next === data?.data?.data?.length - 1 ? 0 : next + 1));
  };

  if (isPending) return <div className='min-h-screen flex justify-center items-center'>Loading...</div>;
  return (
    <section className='my-10 bg-red-300'>
      <div className='px-5 py-10'>
        {/* <h2 className='text-lg text-gray-100 font-bold'>Trending Now</h2>
        <div className="w-1/3 h-px bg-gray-300"></div> */}
        <h2 className="text-xl font-bold text-gray-100 inline-block relative after:content-[''] after:block after:h-px after:bg-gray-300 after:w-1/2 after:mt-1">
          The Best Of Live Shows 
        </h2>
        <div className='py-6 hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data?.data?.data?.map((event: EVENT_TYPE, ind: number) => (
            <EventCard key={ind} event={event} />
          ))}
        </div>
        <div className="py-6 relative sm:hidden mx-auto">
          {/* <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-hide px-2">
            {data?.data?.data?.map((event: EVENT_TYPE, ind: number) => (
              <div key={ind} className="snap-center shrink-0 w-full px-1">
                <EventCard event={event} />
              </div>
            ))}
          </div> */}
          <div className="w-full">
            <EventCard event={data?.data?.data[currentIndex]} />
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </div>

      </div>
    </section>
  )
}

export default LiveEvents;