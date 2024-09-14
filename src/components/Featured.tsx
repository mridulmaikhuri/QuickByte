import React from 'react'
import { recipes } from './food'
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


function Featured() {
  let popularRecipes = [...recipes];

  popularRecipes.sort((a: any, b: any) => b.rating - a.rating); 
  popularRecipes = popularRecipes.slice(0, 10);

  return (
    <div>
      <div className='text-4xl font-serif font-bold text-red-500 ml-10 mt-5'>
        Popular
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5'>
        {
          popularRecipes && popularRecipes.length > 0 ? (
            popularRecipes.map((recipe: any, index: number) => (
              <Link href={'/menu/' + recipe.id} key={index} className='text-2xl font-bold text-red-500 font-sans ml-5 mt-3'>
                <Card className='h-auto'>
                  <CardHeader className='h-[15vh]'>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>{recipe.cuisine}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex justify-center'>
                    <Image 
                      src={recipe.image} 
                      alt={recipe.name} 
                      width={300} 
                      height={300} 
                      className='object-contain w-full h-auto'
                    />
                  </CardContent>
                  <CardFooter className='flex items-center justify-start gap-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2L14.3095 8.71287L21 9.39929L16.5 14.0474L17.619 21L12 17.8529L6.38104 21L7.5 14.0474L3 9.39929L9.69048 8.71287L12 2Z" fill="gold" stroke="black" strokeWidth="1" />
                    </svg>
                    <p className='text-lg'>{recipe.rating}</p>
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

export default Featured
