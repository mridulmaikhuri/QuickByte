"use client"
import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@clerk/nextjs';
import LoadingSpinner from '@/components/loading';
import Link from 'next/link'

type ChildComponentProps = {
  cart: Map<any, any>;
  recipes: [any];
};

const CartItems: React.FC<ChildComponentProps> = ({ cart, recipes }) => {
  const { user }: any = useUser();

  if (!user) {
    return <div className='min-h-[80vh]'>
      <LoadingSpinner />
    </div>
  }

  const userId = user.id;

  const [cartItems, setCartItems] = useState(cart);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()

  const handleChange = (newValue: any, key: any) => {
    if (newValue < 0) {
      toast({
        description: 'Quantity cannot be less than 0.',
        duration: 3000,
        className: 'bg-red-100'
      });
      return;
    }
    setCartItems((prev) => ({ ...prev, [key]: newValue }));
  }

  useEffect(() => {

  }, [cartItems])

  const handleDeleteItem = async (key: any) => {
    try {
      const response = await fetch(`/api/cart/${userId}?itemId=${key} `, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        toast({
          description: 'Item deleted successfully.',
          duration: 3000,
          className: 'bg-green-100'
        });
      } else {
        toast({
          description: 'Something went wrong. Please try again.',
          duration: 3000,
          className: 'bg-red-100'
        });
      }
      setCartItems((prev) => {
        const newItems: any = { ...prev };
        if (key in newItems) {
          delete newItems[key];
        }
        return newItems;
      });
    } catch (error) {
      toast({
        description: 'Something went wrong. Please try again.',
        duration: 3000,
        className: 'bg-red-100'
      });
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, order: {
            time: new Date(),
            items: Object.entries(cartItems).map(([key, value]) => ({
              name: recipes[Number(key) - 1].name,
              image: recipes[Number(key) - 1].image,
              price: Math.floor(recipes[Number(key) - 1].rating * recipes[Number(key) - 1].reviewCount),
              quantity: value
            }))
          }
        })
      });
      const data = await response.json();

      if (!data.success) {
        toast({
          description: 'Something went wrong. Please try again.',
          duration: 3000,
          className: 'bg-red-100'
        });

        return ;
      }

      const deleteResponse = await fetch(`/api/cart/${userId}?itemId=${-1} `, {
        method: 'DELETE',
      });

      const deleteData = await deleteResponse.json();
      if (!deleteData.success) {
        toast({
          description: 'Something went wrong. Please try again.',
          duration: 3000,
          className: 'bg-red-100'
        });

        return ;
      }

      setCartItems(new Map());

      toast({
        description: 'Order placed successfully.',
        duration: 3000,
        className: 'bg-green-100'
      });
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

  let total = 0;
  Object.entries(cartItems).forEach(([key, value]) => {
    total += value * Math.floor(recipes[Number(key) - 1].rating * recipes[Number(key) - 1].reviewCount);
  });

  if (loading) {
    return <div className='min-h-[80vh]'><LoadingSpinner /></div>
  }
  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        
      <div className="mb-8">
        <Image 
          src="/empty-cart.jpg"
          alt="Empty Cart"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>

      <h1 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h1>
      <p className="text-lg text-gray-500 mb-8">
        Looks like you haven't added anything to your cart yet.
      </p>

      <Button 
        className="bg-red-500 hover:bg-yellow-500 text-white px-6 py-3 rounded-full text-xl"
      >
        Start Ordering
      </Button>
    </div>
    )
  }
  return (
    <div>
      <h1 className='text-red-500 font-extrabold text-center text-4xl font-sans mt-2 mb-5'>Cart Items [{Object.keys(cartItems).length || 0} Items]</h1>
      <Table>
        <TableHeader className='border-b-2 border-black text-xl bg-slate-200'>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead className='mr-3'>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-xl'>
          {Object.entries(cartItems).map(([key, value], index) => (
            <TableRow key={key} className={`border-b border-black ${index % 2 !== 0 ? 'bg-slate-50' : ''}`}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className='flex items-center gap-6'>
                <Link href={`/menu/${key}`} className='flex justify-center items-center gap-3'>
                  <Image src={recipes[Number(key) - 1].image} alt={recipes[Number(key) - 1].name} width={50} height={50} className='rounded-full' />
                  <div>{recipes[Number(key) - 1].name}</div>
                </Link>

              </TableCell>
              <TableCell>${Math.floor(recipes[Number(key) - 1].rating * recipes[Number(key) - 1].reviewCount)}</TableCell>
              <TableCell className='text-lg'>
                <div className='flex'>
                  <div className='border border-black p-2 cursor-pointer' onClick={() => handleChange(value - 1, key)}>-</div>
                  <input className='border-b border-t border-black w-[2vw] text-center' type="text" value={value} onChange={(e) => handleChange(Number(e.target.value), key)} />
                  <div className='border border-black p-2 cursor-pointer' onClick={() => handleChange(value + 1, key)}>+</div>
                </div>

              </TableCell>
              <TableCell className=''>${value * Math.floor(recipes[Number(key) - 1].rating * recipes[Number(key) - 1].reviewCount)}</TableCell>
              <TableCell className='w-[5vw]'>
                <button onClick={() => handleDeleteItem(key)}>
                  <FontAwesomeIcon icon={faTrash} className='text-red-500 text-xl ' />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-end mt-10 mr-5'>
        <div className=' bg-slate-100 w-fit pl-10 pr-10 pb-3 pt-3 border border-black rounded-lg'>
          <div className='w-fit p-2 text-xl'>
            <span>Grand Total: </span>
            <span className='ml-10'>${total}</span>
          </div>
          <Button className={`bg-red-500 w-[15vw] h-[6vh] rounded-full hover:bg-yellow-500 text-xl mt-3`}
            onClick={handleSubmit}>
            Order Now
          </Button>
        </div>
      </div>

    </div>
  )
}

export default CartItems