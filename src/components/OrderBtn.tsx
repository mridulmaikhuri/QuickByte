import React from 'react';
import { Button } from './ui/button';

function OrderBtn({ width = '18vw', height = '6vh'}) {
  return (
    <div><Button className={`bg-red-500 w-[${width}] h-[${height}] rounded-full hover:bg-yellow-500 text-xl`}>Order Now</Button></div>
  )
}

export default OrderBtn