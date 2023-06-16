import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import { ImSpinner9 } from "react-icons/im";
import Swal from 'sweetalert2';

const AddClass = () => {
  const { user, userData } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  console.log(userData);
  const createClass = async (classData) => {
    try {
      // Make the API request to add the class
      const response = await fetch('http://localhost:5000/classes', {
        method: 'POST',
        body: JSON.stringify(classData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding class:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create a new class with pending status
      await createClass({
        className: data.className,
        classImage: data.classImage,
        instructorName: user ? user.displayName : '',
        instructorEmail: user ? user.email : '',
        instructorId: userData? userData._id : '',
        availableSeats: parseInt(data.availableSeats),
        price: parseFloat(data.price),
        status: 'pending',
        enrolled: 0,
      });

      // Reset the form after successful submission
      // You can also redirect the user to a different page
      // after the class is added.
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your class has been added',
        showConfirmButton: false,
        timer: 1500
      })
      reset();
    } catch (error) {
      console.error('Error adding class:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="className" className="block mb-2">
            Class Name
          </label>
          <input
            type="text"
            id="className"
            {...register('className', { required: true })}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="classImage" className="block mb-2">
            Class Image URL
          </label>
          <input
            type="text"
            id="classImage"
            {...register('classImage', { required: true })}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        {user && (
          <>
            <div className="mb-4">
              <label htmlFor="instructorName" className="block mb-2">
                Instructor Name
              </label>
              <input
                type="text"
                id="instructorName"
                value={user.displayName}
                disabled
                className="border border-gray-300 p-2 rounded-md w-full bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instructorEmail" className="block mb-2">
                Instructor Email
              </label>
              <input
                type="email"
                id="instructorEmail"
                value={user.email}
                disabled
                className="border border-gray-300 p-2 rounded-md w-full bg-gray-100"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label htmlFor="availableSeats" className="block mb-2">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            {...register('availableSeats', { required: true })}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register('price', { required: true })}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded-md border border-black hover:bg-white hover:text-black flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <ImSpinner9 className="animate-spin mr-2 text-3xl" /> : 'Add Class'}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
