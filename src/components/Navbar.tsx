import Link from 'next/link';
import React from 'react';
import {SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FaShoppingCart } from 'react-icons/fa';


function Navbar() {
    return (
        <nav className='font-sans h-[8vh] flex justify-between items-center text-white text-xl sticky top-0 z-50 bg-opacity-100 bg-red-500'>
            <div className='pl-5 font-extrabold font-serif'>QUICKBITE</div>
            <div className='flex w-1/3 justify-evenly font-bold'>
                <SignedOut>
                    <div className='w-1/2'></div>
                    <div className='w-1/2 flex justify-between pr-10'>
                        <SignInButton />
                        <SignUpButton />
                    </div>
                </SignedOut>
                <SignedIn>
                    <Link href='/' className='my-auto'>Home</Link>
                    <Link href={'/menu'} className='my-auto'>Menu</Link>
                    <Link href={'/cart'} className='flex gap-2 items-center'>
                        <FaShoppingCart size={20}/> 
                        <div>Cart</div>
                    </Link>
                    <Link href={'/orders'} className='my-auto'>Orders</Link>
                    <div className='border border-white rounded-full'><UserButton /></div>
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar