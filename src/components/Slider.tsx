"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'

const slides = [
  {
    id: 1,
    image: '/Slider/food.jpeg',
    content: "Get Best quality and tasty food from all across the world"
  },
  {
    id: 2,
    image: '/Slider/delivery.jpeg',
    content: "Fastest delivery at your door step"
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
      //console.log('slide changed');
      setId((prev) => prev === slides.length - 1 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [])
  return (
    <div className='flex items-center border-b-2 border-black'>
      <div className='text-4xl border border-1 bg-white border-black rounded-full mr-1 ml-1 cursor-pointer' onClick={() => setId((prev) => prev === 0 ? slides.length - 1 : prev - 1)}>{'<'}</div>
      <div key={slides[id].id} className='flex h-[70vh] w-full'>
        <Image src={slides[id].image} alt="slider image" width={500} height={500} className='basis-3/5' />
        <div className='text-red-500 basis-2/5 flex items-center justify-center text-center text-3xl'>{slides[id].content}</div>
      </div>
      <div className='text-4xl border border-1 bg-white border-black rounded-full mr-1 ml-1 cursor-pointer' onClick={() => setId((prev) => prev === slides.length - 1 ? 0 : prev + 1)}>{'>'}</div>
    </div>
  )
}

export default Slider