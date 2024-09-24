"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import LoadingSpinner from '@/components/loading';
import CartItems from '@/components/CartItems';

function Cart() {

    const { user }: any= useUser();
    const [cart, setCart] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<any>(null);
    const [recipes, setRecipes] = React.useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCart();
                await fetchRecipes();
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (!user) {
        return <div className='min-h-[80vh]'>
            <LoadingSpinner />
        </div>
    }

    const userId = user.id;

    const fetchCart = async () => {
        try {
            const response = await fetch(`/api/cart/${userId}`);
            const data = await response.json();
            setCart(data);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    };
    async function fetchRecipes() {
        try {
            const apiResponse = await fetch('https://dummyjson.com/recipes');
            const result = await apiResponse.json();
            setRecipes(result?.recipes);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    if (loading)
        return <div>
            <LoadingSpinner />
        </div>

    if (error)
        return <div>
            <p>Error: {error.message}</p>
        </div>
    
    console.log(cart.cart.items);
  return (
    <div>
        <CartItems cart={cart.cart.items} recipes={recipes}/>
    </div>
  )
}

export default Cart