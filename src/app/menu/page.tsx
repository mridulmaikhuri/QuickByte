"use client"
import React, { useEffect, useState } from 'react'
import { fetchRecipes } from '@/components/food'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '@/components/loading'

function Menu() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/recipes');
        const result = await response.json();

        const data = result?.recipes;

        setRecipes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const menu = recipes.filter((recipe: any) => (
    recipe.name.toLowerCase().includes(search.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(search.toLowerCase())
  ));

  if (loading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='flex flex-col items-center'>
      <div className="flex justify-between items-center w-full h-[10vh] p-4">
        <div className='w-1/3'></div>
        <div className="font-serif text-5xl font-extrabold text-red-500 text-center mx-4 w-1/3">
          Menu
        </div>

        <div className="flex items-center justify-end space-x-3 ml-4 w-1/3">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-10 pr-4 py-2 h-[5vh] w-[15vw] rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-4'>
        {
          menu && menu.length > 0 ? (
            menu.map((item: any, index: number) => (
              <Link href={'/menu/' + item.id} key={index} className='text-2xl font-bold text-red-500 font-sans ml-2 mt-3'>
                <Card className='h-[68vh]'>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.cuisine}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image src={item.image} alt={item.name} width={400} height={300} />
                  </CardContent>
                  <CardFooter>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2L14.3095 8.71287L21 9.39929L16.5 14.0474L17.619 21L12 17.8529L6.38104 21L7.5 14.0474L3 9.39929L9.69048 8.71287L12 2Z" fill="gold" stroke="black" strokeWidth="1" />
                    </svg>
                    <p>
                      {item.rating}
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