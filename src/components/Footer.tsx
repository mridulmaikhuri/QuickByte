import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-3 mt-5 border-t-2 border-black">
      <div className="container mx-auto text-center">
        <Link href="/" className="text-2xl font-extrabold font-serif tracking-wider hover:text-gray-200 transition-colors">
          QUICKBYTE
        </Link>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mt-2">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:text-gray-400 transition-colors">
            <FaFacebook size={24} />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter" className="hover:text-gray-400 transition-colors">
            <FaTwitter size={24} />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:text-gray-400 transition-colors">
            <FaInstagram size={24} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-2 text-sm">
          &copy; {new Date().getFullYear()} QUICKBYTE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
