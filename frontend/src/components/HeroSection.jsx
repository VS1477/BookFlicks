import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.jpg")] bg-cover bg-center h-screen relative'>
      {/* Dark overlay for better text readability */}
      <div className='absolute inset-0 bg-black/60'></div>
      
      {/* Content with relative positioning to appear above overlay */}
      <div className='relative z-10 flex flex-col items-start gap-5'>

        <img src={assets.marvelLogo} alt="" className="max-h-12 lg:h-12 mt-16"/>

        <h1 className='text-4xl md:text-6xl md:leading-[70px] font-extrabold max-w-3xl text-white drop-shadow-2xl tracking-tight'>Avengers <br /> Infinity War</h1>

        <div className='flex items-center gap-4 text-gray-200 text-base md:text-xl font-semibold drop-shadow-lg'>
          <span>Action | Adventure | Sci-Fi</span>
          <div className='flex items-center gap-1'>
              <CalendarIcon className='w-5 h-5'/> 2018
          </div>
          <div className='flex items-center gap-1'>
              <ClockIcon className='w-5 h-5'/> 2h 8m
          </div>
        </div>
        <p className='max-w-xl text-gray-100 text-base md:text-lg font-medium drop-shadow-lg mt-1'>The Avengers must stop Thanos from getting his hands on all the Infinity Stones before he snaps his fingers and wipes out half of all life in the universe.</p>
        <button onClick={()=> navigate('/movies')} className='flex items-center gap-2 px-6 py-3 text-base bg-primary hover:bg-primary-dull transition rounded-full font-bold cursor-pointer mt-3 shadow-lg'>
           Explore Movies
           <ArrowRight className="w-5 h-5"/>
        </button>
      </div>
    </div>
  )
}

export default HeroSection
