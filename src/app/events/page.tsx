import { Guitar, Mic, MicVocal, Wine } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const EventPage = () => {

  const exploreItems = [
    {
      title: 'Concerts',
      icon: Guitar,
      color: 'text-blue-100'
    },
    {
      title: 'Comedy',
      icon: MicVocal,
      color: 'text-yellow-100'
    },
    {
      title: 'Nightlife',
      icon: Wine,
      color: 'text-purple-100'
    }
  ]

  return (
    <section className='min-h-screen flex flex-col my-10 mx-10'>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">Explore Events</h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      <div className='flex xs:flex-row flex-col gap-5 my-10'>
        {exploreItems.map((item,index)=>{
          return (
            <Link href={'/events/concerts'} key={index} className='flex flex-col xs:px-2 py-3 rounded-sm border border-gray-200 bg-yellow-300 text-gray-800 items-center'>
              <h3 className='text-sm font-medium'>{item.title}</h3>
              <item.icon className={`h-6 w-6 mb-2 text-gray-800`} />
            </Link>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">All Events</h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
    </section>
  )
}

export default EventPage;