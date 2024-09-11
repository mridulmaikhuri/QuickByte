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

            <div className="hidden md:flex w-1/3 text-xl justify-evenly font-bold items-center">
                <SignedOut>
                    <div className="flex gap-4">
                        <SignInButton>
                            <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Sign In</button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors">Sign Up</button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <Link href="/" className="hover:text-gray-200 transition-colors">Home</Link>
                    <Link href="/menu" className="hover:text-gray-200 transition-colors">Menu</Link>
                    <Link href="/cart" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
                        <FaShoppingCart size={20} />
                        <span>Cart</span>
                    </Link>
                    <Link href="/orders" className="hover:text-gray-200 transition-colors">Orders</Link>
                    <UserButton />
                </SignedIn>
            </div>

            <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-[8vh] left-0 w-full bg-red-500 flex flex-col items-center md:hidden shadow-lg">
                    <SignedOut>
                        <div className="w-full flex flex-col items-center gap-4 p-4">
                            <SignInButton>
                                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors w-full text-center">Sign In</button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors w-full text-center">Sign Up</button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/" className="block py-4 hover:bg-red-600 w-full text-center">Home</Link>
                        <Link href="/menu" className="block py-4 hover:bg-red-600 w-full text-center">Menu</Link>
                        <Link href="/cart" className="py-4 flex justify-center items-center gap-2 hover:bg-red-600 w-full text-center">
                            <FaShoppingCart size={20} />
                            <span>Cart</span>
                        </Link>
                        <Link href="/orders" className="block py-4 hover:bg-red-600 w-full text-center">Orders</Link>
                        <div className="py-4">
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
