"use client"
import { fetchSingleEvent } from '@/lib/queries/fetchEvents';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { Dot, LoaderCircle } from 'lucide-react';
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useState } from 'react'

// Extend the Window interface to include Razorpay
// declare global {
//   interface Window {
//     // @ts-expect-error: Razorpay SDK type not yet fully declared on window.
//     Razorpay: any;
//   }
// }

const CheckoutPage = () => {

  const {data: session, status } = useSession();  //, 

  const router = useRouter();
  const params = useParams();
  const { eventId } = params as { eventId: string, category: string };

  const [ticketCount, setTicketCount] = useState(1);

  const handleDecrease = () => setTicketCount((prev) => (prev > 1? prev - 1 : 1));
  const handleIncrease = () => setTicketCount((prev) => prev + 1);

  const [isProcessing, setIsProcessing] = useState(false);

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
  const handlePayment = async() => {
    const totalAmount = Number(data?.data?.data[0].eventPrice) * ticketCount;
    const createdAt = new Date().toISOString();
    const eventId = data?.data?.data[0].id;
    const userId = session?.user?.id;

    try{
    const response = await axios.post(`/api/create-order`, {
      totalAmount, createdAt, eventId, userId});
      if(response.data.success){
        setIsProcessing(true);
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: totalAmount * 100,
          currency: 'INR',
          description: `Order for ${data?.data?.data[0].title}`,
          order_id: response.data.data.orderId,
          handler: async (response: RazorpayPaymentSuccessResponse) => {
            console.log("Payment Successful", response);
          },
          prefill: {
            name: session?.user?.name || 'Guest',
            email: session?.user?.email || '',
            contact: "9999999999",
          },
          theme: {
            color: "#000000",
          }
        };
        // 
        // @ts-expect-error: Razorpay SDK type not yet fully declared on window.
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else{
        console.log("Failed to create order", response.data.message);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      // alert("An error occurred while processing your payment. Please try again later.");
    } finally {
      setIsProcessing(true);
      router.push(`/`);
    }
  }

  if (status === "loading" || isLoading) return <div className='min-h-screen flex justify-center items-center'><LoaderCircle className='animate-spin ' /></div>

  return (
    <div className='min-h-screen'>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
            <h3 className='text-gray-800 text-md font-semibold  '>₹{data?.data?.data[0].eventPrice}</h3>
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
      <div className='mt-5 mb-10 mx-10 md:mx-30 border-y border-gray-100 py-5 px-2 flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
        <h3 className='text-gray-800 font-semibold text-lg'>Total: ₹{Number(data?.data?.data[0].eventPrice) * ticketCount}</h3>
        <p className='text-gray-500 font-medium text-sm'>{ticketCount} Tickets</p>
        </div>
        <button onClick={handlePayment} disabled={isProcessing} className='bg-gray-900 disabled:bg-gray-600 shadow-lg text-gray-50 font-medium text-sm px-3 py-2 rounded-sm' >{isProcessing? "Processing" : "Add To Cart"}</button>
      </div>
    </div>
  );
}

export default CheckoutPage;