import React from 'react';
import error from '../../assets/pngwing.com.png'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={error} alt="" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/"><button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Back to Home
      </button></Link>
    </div>
  );
};

export default NotFound;
