"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from '@/components/loading';


function Category({ recipe }: any) {
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  if (!user) {
    return <div className='min-h-[80vh]'>
        <LoadingSpinner />
    </div>
  }

  const userId = user?.id;

  async function handleAddToCart() {
    try {
      setLoading(true);
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
      if (!data.success) {
        toast({
          title: 'Error',
          description: data.message,
          duration: 3000,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: data.message,
          duration: 3000,
          className: 'bg-green-100'
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const quantityElement = document.getElementById('quantity') as HTMLSelectElement;
      const value = quantityElement?.value;

      const response = await fetch('/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, order: {
          time: new Date(),
          items: [{
            name: recipe.name,
            image: recipe.image,
            price: Math.floor(recipe.rating * recipe.reviewCount),
            quantity: value
          }]
        }})
      });
      const data = await response.json();

      if (!data.success) {
        toast({
          description: 'Something went wrong. Please try again.',
          duration: 3000,
          className: 'bg-red-100'
        });
      } else {
        toast({
          description: 'Order placed successfully.', 
          duration: 3000,
          className: 'bg-green-100'
        });
      }
    } catch (error) {
      toast({
        description: 'Internal Server Error',
        duration: 3000,
        className: 'bg-red-100'
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className='min-h-[80vh]'>
        <LoadingSpinner />
    </div>
  }
  return (
    <div>
      <h1 className='text-5xl font-bold text-center font-sans text-red-500'>
        {recipe.name}
      </h1>
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
          <Button className={`bg-red-500 w-[20vw] h-[6vh] rounded-full hover:bg-yellow-500 text-xl`} onClick = {handleSubmit}>Order Now</Button>
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