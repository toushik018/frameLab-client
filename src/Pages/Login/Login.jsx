import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Assuming you have React Router set up for navigation

function Login() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" {...register('email', { required: true })} className="border border-gray-300 p-2 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} {...register('password', { required: true })} className="border border-gray-300 p-2 rounded-md w-full" />
            <button type="button" onClick={handleTogglePassword} className="absolute top-1/2 right-2 transform -translate-y-1/2">
              {showPassword ? (
                <RiEyeOffFill className="text-gray-500 h-5 w-5" />
              ) : (
                <RiEyeFill className="text-gray-500 h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
      </form>
      <div className="mt-4">
        <Link to="/register" className="text-blue-500">Create an account</Link>
      </div>
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Sign in with Google</button>
    </div>
  );
}

export default Login;
