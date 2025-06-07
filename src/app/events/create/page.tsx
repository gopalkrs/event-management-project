"use client"
import React, { useEffect } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';

const EventPage = () => {

  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(login),
    defaultValues: {
      title: "",
      state: "",
      date: "",
      city: "",
      description: "",
      image: "",
      startTime: "",
      endTime: "",
      eventType: "",
      capacity: 0,
      eventTags: "",
      createdBy: ""
    },
  });

  useEffect(()=>{
    if(session?.user?.id){
      setValue("createdBy", session?.user?.id);
    }
  },[session, setValue]);

  type FormData = {
    title: string;
    state: string;
    date: string;
    city: string;
    description: string;
    image: string;
    startTime: string;
    endTime: string;
    eventType: string;
    capacity: number;
    eventTags: string;
    createdBy: string;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];

    if (!img) {
      return;
    }
    console.log(process.env.NEXT_PUBLIC_CLOUDINARY_URL);
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', 'firstuser_preset');
    data.append('cloud_name', 'doqxo31cf')
    const res = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, data);
    if (res.data) setValue("image", res?.data.url);
    console.log(res?.data.url);
  }

  const onSubmitHandler = async (data: FormData) => {
    
    const { date, startTime, endTime, ...rest } = data;

    const fullStartTime = new Date(`${date}T${startTime}`);
    const fullEndTime = new Date(`${date}T${endTime}`);

    const payload = {
      ...rest,
      date: new Date(date),
      startTime: fullStartTime,
      endTime: fullEndTime,
    };
    // setValue("createdBy", session?.user?.email || "");
    console.log(payload);
    const res = await axios.post(`http://localhost:3000/api/events`, payload);
    console.log(res);
  }

  return (
    <section className='min-h-screen px-5 my-10'>
      <h2 className='md:text-2xl text-xl font-normal'>Create Event</h2>
      <div className='mt-5 py-5 px-5 rounded-sm shadow-md border-1 border-gray-200 bg-white'>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-4 mt-5'>

          {/* Grid container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Event Name */}
            <div className='flex flex-col'>
              <label htmlFor='title' className='text-sm mb-1'>Event Name</label>
              <input type='text' id='title' {...register("title")} placeholder='Enter event name' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='title' className='text-sm mb-1'>Event Type</label>
              <Select onValueChange={(value) => setValue("eventType", value)}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="concert">Concert</SelectItem>
                  <SelectItem value="theatre">Theatre</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="food_and_drink">Food/Drinks</SelectItem>
                  <SelectItem value="other">Food/Drinks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Event Date */}
            <div className='flex flex-col'>
              <label htmlFor='eventDate' className='text-sm mb-1'>Event Date</label>
              <input type='date' id='eventDate' {...register("date")} className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            {/* Event Location */}
            <div className='flex flex-col'>
              <label htmlFor='state' className='text-sm mb-1'>State</label>
              <input type='text' id='state' {...register("state")} placeholder='Enter event location' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='city' className='text-sm mb-1'>City</label>
              <input type='text' id='city' {...register("city")} placeholder='Enter event location' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            {/* Start Time */}
            <div className='flex flex-col'>
              <label htmlFor='startTime' className='text-sm mb-1'>Start Time</label>
              <input type='time' id='startTime' {...register("startTime")} className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            {/* End Time */}
            <div className='flex flex-col'>
              <label htmlFor='endTime' className='text-sm mb-1'>End Time</label>
              <input type='time' id='endTime' {...register("endTime")} className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            {/* Capacity */}
            <div className='flex flex-col'>
              <label htmlFor='capacity' className='text-sm mb-1'>Capacity</label>
              <input type='number' id='capacity' {...register("capacity")} placeholder='Max attendees' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

            {/* Created By
            <div className='flex flex-col'>
              <label htmlFor='createdBy' className='text-sm mb-1'>Created By</label>
              <input type='text' id='createdBy' {...register("createdBy")} placeholder='Organizer Name' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div> */}

            {/* Event Image */}
            <div className='flex flex-col'>
              <label htmlFor='eventImage' className='text-sm mb-1'>Event Image</label>
              <input type='file' id='eventImage' onChange={handleImageUpload} className='p-2 text-sm text-gray-800 rounded bg-white border' />
            </div>

            {/* Event Tags */}
            <div className='flex flex-col'>
              <label htmlFor='eventTags' className='text-sm mb-1'>Event Tags</label>
              <input type='text' id='eventTags' {...register("eventTags")} placeholder='Comma-separated tags' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800 rounded' />
            </div>

          </div>


          <div className='flex flex-col'>
            <label htmlFor='description' className='text-sm mb-1'>Description</label>
            <textarea id='description' {...register("description")} placeholder='Describe the event...' className='p-2 outline-1 outline-gray-300 text-sm text-gray-800  rounded h-24' />
          </div>

          <button type='submit' className='bg-gray-800 text-white px-2 py-1 rounded self-start mt-4'>Create Event</button>
        </form>
      </div>
    </section>

  )
}

export default EventPage