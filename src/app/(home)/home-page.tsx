import LiveEvents from '@/components/home/live-events';
import TrendingNow from '@/components/home/trending-now';
import React from 'react'

const HomePage = () => {

  
  return (
    <section className='min-h-screen my-10'>
        <TrendingNow />
        <LiveEvents />
    </section>
  )
}

export default HomePage;