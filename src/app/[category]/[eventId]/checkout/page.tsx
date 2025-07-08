"use client"
import { fetchSingleEvent } from '@/lib/queries/fetchEvents';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Dot, LoaderCircle } from 'lucide-react';
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CheckoutPage = () => {

  const { status } = useSession();  //data: session, 

  const router = useRouter();
  const params = useParams();
  const { eventId } = params as { eventId: string, category: string };

  const [ticketCount, setTicketCount] = useState(1);

  const handleDecrease = () => setTicketCount((prev) => (prev > 1? prev - 1 : 1));
  const handleIncrease = () => setTicketCount((prev) => prev + 1);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetchSingleEvent', eventId],
    queryFn: () => fetchSingleEvent({ eventId }),
  });

  //console.log(data);

  if (status === "loading" || isLoading) return <div className='min-h-screen flex justify-center items-center'><LoaderCircle className='animate-spin ' /></div>

  return (
    <div className='min-h-screen'>
      <div className='flex justify-center'>
      <div className='sm:my-20 my-5 border border-gray-300  px-10 w-[80%] py-6'>
        <h2 className='text-center text-gray-800 py-1 border-b border-gray-200 font-medium text-md'>{data?.data?.data[0].title}</h2>
        <div className='flex flex-row items-center space-x-1 py-1 justify-center'>
          <h3 className='text-center text-gray-500 font-medium text-sm'>{format(new Date(data?.data?.data[0].date), 'do MMM')} {' | '}</h3>
          <h3 className='text-center text-gray-500 font-medium text-sm'>{format(new Date(data?.data?.data[0].startTime), 'HH:mmbbb')}</h3>
          <h3 className='text-center text-gray-500 font-medium text-sm flex flex-row items-center'><Dot className='w-5 h-5' />{data?.data?.data[0].city}</h3>
        </div>
        <div className='py-5 space-y-1'>
          <h2 className='text-sm font-medium'>General Access</h2>
          <div className='flex flex-row items-center justify-between'>
            <h3 className='text-gray-800 text-md font-semibold  '>₹{Number(data?.data?.data[0].eventPrice) * ticketCount}</h3>
            <div className="flex items-center gap-4">
              <button
                className="bg-black text-white px-3 py-1 rounded-full text-xl hover:bg-gray-800"
                onClick={handleDecrease}
              >
                −
              </button>
              <span className="text-black text-lg font-semibold">{ticketCount}</span>
              <button
                className="bg-black text-white px-3 py-1 rounded-full text-xl hover:bg-gray-800"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <div></div>

          </div>
          <p className='py-1 text-left text-muted-foreground text-sm'>This ticket grants entry to one individual to the General Access area.</p>
        </div>
      </div>
      </div>
      <div className='mt-5 mb-10 mx-10 md:mx-30 p-2 flex justify-end'>
        <button className='bg-blue-500 text-gray-50 font-medium text-sm px-2 py-2 rounded-md' >Add To Cart</button>
      </div>
    </div>
  );
}

export default CheckoutPage;