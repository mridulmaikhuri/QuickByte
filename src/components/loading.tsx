import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className = "flex justify-center items-center h-screen">
      <ClipLoader color="#123abc" loading={true} size={50} />
    </div>
  );
};

export default LoadingSpinner;