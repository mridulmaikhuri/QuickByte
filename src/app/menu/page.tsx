import React from 'react'
import { recipes } from '@/components/food'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

function Menu() {
  return (
    <div className='flex flex-col items-center min-h-93vh'>
      <div className='text-3xl text-center font-extrabold text-red-500'>Menu</div>
      <div className='grid grid-cols-4'>
      {
          recipes && recipes.length > 0 ? (
            recipes.map((recipe: any, index: number) => (
              <Link href = {'/menu/' + recipe.id} key={index} className='text-2xl font-bold text-red-500 font-sans ml-5 mt-3'>
                <Card>
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>{recipe.cuisine}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image src={recipe.image} alt={recipe.name} width={300} height={300} />
                  </CardContent>
                  <CardFooter>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2L14.3095 8.71287L21 9.39929L16.5 14.0474L17.619 21L12 17.8529L6.38104 21L7.5 14.0474L3 9.39929L9.69048 8.71287L12 2Z" fill="gold" stroke="black" strokeWidth="1" />
                    </svg>
                    <p>
                      {recipe.rating}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : null
        }
      </div>
    </div>
  )
}

export default Menu