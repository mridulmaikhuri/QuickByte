"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FaShoppingCart } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="font-sans h-[8vh] flex justify-between items-center sticky top-0 z-50 bg-red-500 text-white text-lg px-6 shadow-lg">
            <div className="font-extrabold text-2xl font-serif">QUICKBITE</div>

            <div className="hidden md:flex w-1/3 text-xl justify-end gap-4 font-bold items-center">
                <SignedOut>
                    <div className="flex gap-8 mx-2">
                        <SignInButton>
                            <button className="text-xl text-white font-sans rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:scale-110">
                                Login
                            </button>
                        </SignInButton>
                        <SignUpButton>
                            <button className=" text-white font-sans rounded-full text-xl flex items-center transition-all duration-300 ease-in-out transform hover:scale-110">
                                Register
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className='flex gap-8 mx-2'>
                        <Link href="/" className="hover:text-gray-200 transition-all hover:scale-110">Home</Link>
                        <Link href="/menu" className="hover:text-gray-200 transition-all hover:scale-110">Menu</Link>
                        <Link href="/cart" className="flex items-center gap-2 hover:text-gray-200 transition-all hover:scale-110">
                            <FaShoppingCart size={20} />
                            <span>Cart</span>
                        </Link>
                        <Link href="/orders" className="hover:text-gray-200 transition-all hover:scale-110">Orders</Link>
                    </div>
                    <UserButton />
                </SignedIn>
            </div>

            <div className="md:hidden flex gap-4">
                <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <UserButton />
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-[8vh] left-0 w-full bg-red-500 flex flex-col items-center md:hidden shadow-lg">
                    <SignedOut>
                        <div className="w-full flex flex-col items-center gap-4 p-4">
                            <SignInButton>
                                <button className="px-5 py-2 transition-all rounded duration-100 ease-in-out w-11/12 text-center hover:scale-110 hover:border-2">
                                    Login
                                </button>

                            </SignInButton>
                            <SignUpButton>
                                <button className="px-5 py-2 hover:scale-110 hover:border-2 transition-all duration-100 ease-in-out transform w-11/12 text-center text-white">
                                    Register
                                </button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className="w-full flex flex-col items-center gap-4 p-4">
                            <Link href="/" className="block py-2 hover:border-2 w-11/12 text-center hover:scale-110">Home</Link>
                            <Link href="/menu" className="block py-2 hover:border-2 w-11/12 text-center hover:scale-110">Menu</Link>
                            <Link href="/cart" className="py-2 flex justify-center items-center gap-2 hover:border-2 w-11/12 text-center hover:scale-110">
                                <FaShoppingCart size={20} />
                                <span>Cart</span>
                            </Link>
                            <Link href="/orders" className="block py-2 hover:border-2 w-11/12 text-center hover:scale-110">Orders</Link>
                            {/* <div className='border-t-2 border-white w-full'></div>
                            <div className="py-1">
                                <UserButton />
                            </div> */}
                        </div>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
