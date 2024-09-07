"use client"
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import LoadingSpinner from '@/components/loading'
import Image from 'next/image';

function OrdersPage() {
  const [orderList, setOrderList] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user }: any = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Orders/${userId}`);
        const data = await response.json();

        console.log(data);

        if (data.success) {
          setOrderList(data.orders || []);
          console.log(data.total_price);
          setTotal(data.total_price || 0);
        } else {
          setError(data.message);
        }

      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (orderList.length === 0) {
    return (
      <div className='min-h-[80vh] flex flex-col items-center mt-8 font-serif'>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">My Orders [{orderList.length} Orders]</h1>
        <p className="text-xl text-gray-600 mt-4">No orders have been placed yet.</p>
      </div>
    )
  }

  return (
    <div className='min-h-[80vh]'>
      <h1 className="text-3xl font-bold mb-6 text-center mt-6">My Orders [{orderList.length} Orders]</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
        {orderList.map((order: any, index: number) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 h-[53vh]">
            <div className='flex justify-between m-2'>
              <p className="text-lg font-semibold">Date: {order.time.split("T")[0]}</p>
              <p className="text-lg font-semibold">Time: {order.time.split("T")[1].split('.')[0]}</p>
            </div>
            <OrderItems items={order.items} />
            <div className='mt-5 mb-2 ml-2 text-xl font-bold'>Total: ${total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;

// Component to render each item inside the order
const OrderItems = ({ items }: { items: any[] }) => {
  if (!items || items.length === 0) {
    return <div>No order items</div>;
  }

  return (
    <div className="mt-4 space-y-4 h-[35vh] overflow-y-auto scrollbar-none hover:scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-gray-500 transition-colors duration-300">
      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex gap-4 items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="w-[5vw] h-[5vw] object-cover rounded-full border-2 border-gray-200"
            />
            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
          </div>
          <div className="mt-2 ml-2 text-sm">
            <p className="text-gray-700 font-semibold">
              Price: <span className="text-gray-900">${item.price}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Quantity: <span className="text-gray-900">{item.quantity}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
