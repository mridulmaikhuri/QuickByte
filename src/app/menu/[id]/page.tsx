import React from 'react';
import { recipes } from '@/components/food'; 
import ClientCategory from './Client';

function Category({ params }: any) {
  const recipe = recipes[params.id - 1];
  return (
    <div>
      <div className='flex justify-center mt-3'>
        <ClientCategory recipe={recipe} />
      </div>
    </div>
  );
}

export default Category;