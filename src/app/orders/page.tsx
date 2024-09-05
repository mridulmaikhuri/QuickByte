"use client"
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import LoadingSpinner from '@/components/loading'
import Image from 'next/image';

function OrdersPage() {
  const [orderList, setOrderList] = useState<any>([]);
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

        if (data.success) {
          setOrderList(data.orders || []);
          console.log(orderList.length);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderList.map((order: any, index: number) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <p className="text-lg font-semibold">Time: {order.time}</p>
            <OrderItems items={order.items} />
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
    <div className="mt-4 space-y-2">
      {items.map((item: any, index: number) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg">
          <p className="text-md font-medium">{item.name}</p>
          <Image src={item.image} alt={item.name} width={200} height={200} className="w-32 h-32 object-cover" />
          <p className="text-sm text-gray-600">Price: ${item.price}</p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
