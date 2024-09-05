import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='border-t-2 border-red-500 text-center text-red-500 f mt-10 mb-5'>
      <Link href={'/'} className='font-extrabold font-sans'>QUICKBYTE</Link>
      <div>&copy;All rights reserved</div>
    </footer>
  )
}

export default Footer