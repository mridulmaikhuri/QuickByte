"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const slides = [
  {
    id: 1,
    image: '/Slider/food.jpeg',
    content: "Get Best quality and tasty food from all across the world"
  },
  {
    id: 2,
    image: '/Slider/delivery.jpg',
    content: "Fastest delivery at your doorstep"
  },
  {
    id: 3,
    image: '/Slider/pizza.jpeg',
    content: "Limited time Offer!!! Get 20% off on your pizza order"
  }
]

function Slider() {
  const [id, setId] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setId((prev) => prev === slides.length - 1 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative flex items-center justify-center border-b-2 border-black overflow-hidden'>
      <div
        className='absolute left-5 text-4xl text-white bg-black p-3 rounded-full cursor-pointer z-10 hover:bg-gray-800 transition duration-300'
        onClick={() => setId((prev) => prev === 0 ? slides.length - 1 : prev - 1)}>
        <FaChevronLeft />
      </div>

      <div key={slides[id].id} className='flex w-full h-[75vh] items-center justify-center'>
        <div className='relative w-full h-full'>

          <Image
            src={slides[id].image}
            alt="slider image"
            fill className='w-full h-full transition-opacity duration-1000'
          />
          <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
            <div className='bg-black bg-opacity-50 p-6 rounded-lg'>
              <p className='text-white text-4xl font-semibold text-center'>
                {slides[id].content}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className='absolute right-5 text-4xl text-white bg-black p-3 rounded-full cursor-pointer z-10 hover:bg-gray-800 transition duration-300'
        onClick={() => setId((prev) => prev === slides.length - 1 ? 0 : prev + 1)}>
        <FaChevronRight />
      </div>

      <div className='absolute bottom-5 flex space-x-2'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setId(index)}
            className={`cursor-pointer w-4 h-4 rounded-full ${index === id ? 'bg-white' : 'bg-gray-500'} transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
