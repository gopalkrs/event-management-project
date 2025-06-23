import React from 'react'

const Footer = () => {
  return (
    <section className='bg-[#0d1b2a] text-gray-200 py-10 px-5'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
          <h2 className='text-xl font-bold font-lobster'>Tiketex</h2>
          <div className='flex items-center flex-col sm:flex-row gap-4'>
            <p className='text-sm font-medium'>About Us</p>
            <p className='text-sm font-medium'>Contact</p>
            <p className='text-sm font-medium'>Privacy Policy</p>
          </div>
          <div>

          </div>
        </div>
        <div className='text-center mt-5 text-sm text-gray-200'>
          &copy; {new Date().getFullYear()} Tiketex. All rights reserved.
        </div>
      </div>
    </section>
  )
}

export default Footer