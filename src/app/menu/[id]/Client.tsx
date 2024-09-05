"use client"

import React from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs';
import OrderBtn from '@/components/OrderBtn';

function Category({ recipe }: any) {
  const { user } = useUser();
  const userId = user?.id;
  async function handleAddToCart() {
    const quantityElement = document.getElementById('quantity') as HTMLSelectElement;
    const qty = quantityElement?.value;
    console.log(qty);
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, recipe, qty }),
    });
    const data = await response.json();
    console.log(data);
    let message = "Recipe added to cart";
    let className = "text-green-600 border-green-600";
    if (!data.success) {
      message = data.message;
      className = "text-red-600 border-red-600";
    }

    const alert = document.getElementById('alert');
    if (alert) {
      document.getElementById('message')!.innerHTML = message;
      const array = className.split(" ");
      alert.classList.add(...array);

      alert.classList.remove('hidden');
      requestAnimationFrame(() => {
        alert.classList.add('show');
      });
    }

    setTimeout(() => {
      if (alert) {
        alert.classList.remove('show');
        setTimeout(() => alert.classList.add('hidden'), 500); 
      }
    }, 3000);
  }


  return (
    <div>
      <h1 className='text-5xl font-bold text-center font-sans text-red-500'>
        {recipe.name}
      </h1>
      <div id='alert' className='fixed top-[9vh] right-1 border-2 p-1 pl-6 pr-2 text-xl hidden'>
        <div id="message" className='inline-block'></div>
        {"      "}
        <span className='cursor-pointer hover:text-red-500' onClick={() => document.getElementById('alert')!.classList.remove('show')}>
          &#10006;
        </span>
      </div>
      <div className='flex justify-center mt-3'>
        <Image src={recipe.image} alt={recipe.name} width={500} height={500} />
        <div className='text-3xl font-sans mr-5 ml-20'>
          <p className='mb-1'>Origin: {recipe.cuisine}</p>
          <p className='mb-1'>Rating <span className='text-yellow-500'>&#9733;</span>: {recipe.rating}</p>
          <p className='mb-1'>ReviewCount: {recipe.reviewCount}</p>
          <p className='mb-1'>Calories: {recipe.caloriesPerServing}</p>
          <p className='mb-2'>Meal Type: {recipe.mealType}</p>
          <p className='mb-1'>Price: Rs {Math.floor(recipe.rating * recipe.reviewCount)}</p>
          <div className='flex gap-2'>
            <p>Quantity: </p>
            <select name="quantity" id="quantity" className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[5vw] p-2.5'>
              {[...Array(10).keys()].map((i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select>
          </div>
          <div className='mt-20'>
            <OrderBtn width = "20vw" height = "6vh" />
          </div>
          <div className='mt-2'>
            <Button className='bg-orange-500 w-[20vw] h-[6vh] rounded-full hover:bg-yellow-500 text-xl' onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category 