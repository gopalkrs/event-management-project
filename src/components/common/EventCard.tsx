import { EVENT_TYPE } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventCard = ({event}: {event : EVENT_TYPE}) => {
  return (
        <Link href={`/events/${event.id}`} key={event.id} className='flex flex-col rounded-lg border bg-gray-50 border-gray-200 shadow-sm text-gray-800 mb-4 pb-2'>
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
  )
}

export default EventCard