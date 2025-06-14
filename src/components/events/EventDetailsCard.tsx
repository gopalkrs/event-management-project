import { format } from 'date-fns'
import { Bookmark, Calendar, MapPin } from 'lucide-react'
import React from 'react'

const EventDetailsCard = () => {
  return (
    <div className='p-3 w-full rounded-lg mt-5 border-1 max-w-[300px] break-words border-gray-300 space-y-5 h-fit'>
          <h2 className='text-gray-900 font-bold text-md'>{data?.data?.data[2].title}</h2>
          <p className='flex flex-row text-xs items-center gap-2'><Bookmark className='h-4 w-4' /> {data?.data?.data[2].eventType.toUpperCase()}</p>
          <div className='flex flex-row text-xs items-center gap-2'>
            <Calendar className='h-4 w-4' />
            <div className='flex flex-row items-center gap-2'>
              <p className='text-gray-900 text-sm'>{format(new Date(data?.data?.data[2].date), 'do MMM')} {' | '}</p>
              <p className='text-gray-900 text-sm'>{format(new Date(data?.data?.data[2].startTime), 'HH:mmbbb')} - {format(new Date(data?.data?.data[2].endTime), 'HH:mmbbb')}</p>
            </div>
          </div>
          <div className='flex items-center flex-row gap-2'>
            <MapPin className='h-4 w-4' />
            <p className='text-gray-900 text-sm'>{data?.data?.data[2].city}</p>
          </div>
          <div className='flex items-center justify-between flex-row gap-2'>
            <p className='text-gray-900 text-sm'>Starts from ₹100</p>
            <button className='py-1 px-3 rounded-sm font-semibold bg-black text-gray-50 '>Book Now</button>
          </div>
        </div>
  )
}

export default EventDetailsCard