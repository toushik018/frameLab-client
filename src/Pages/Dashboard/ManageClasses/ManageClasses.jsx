import React, { useState } from 'react';
import useClasses from '../../../Hooks/useClasses';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const ManageClasses = () => {
  const [allClasses, loading, refetch] = useClasses();

  const handlePermission = (id, status) => {
    fetch(`https://frame-lab-server.vercel.app/classes/approve/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `The class has been ${status}`,
            showConfirmButton: false,
            timer: 1500
          })
        }

      })
  }





  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Class Image</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Class Name</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Instructor Name</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Instructor Email</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Available Seats</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Price</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Status</th>
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allClasses.map((classItem) => (
              <tr key={classItem._id}>
                <td className="px-6 py-4 border-b border-gray-300">
                  <img src={classItem.classImage} alt={classItem.className} className="h-16 w-16 object-cover" />
                </td>
                <td className="px-6 py-4 border-b border-gray-300">{classItem.className}</td>
                <td className="px-6 py-4 border-b border-gray-300">{classItem.instructorName}</td>
                <td className="px-6 py-4 border-b border-gray-300">{classItem.instructorEmail}</td>
                <td className="px-6 py-4 border-b border-gray-300">{classItem.availableSeats}</td>
                <td className="px-6 py-4 border-b border-gray-300">{classItem.price}</td>
                <td className="px-6 py-4 border-b border-gray-300">{classItem.status}</td>
                <td className="px-6 py-4 border-b border-gray-300">

                  <button
                    onClick={() => handlePermission(classItem._id, 'approved')}
                    className={`px-4 py-2 rounded-md mr-2 mb-1 ${classItem.status === 'denied' || classItem.status === 'approved' ? 'bg-green-200 text-gray-700' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                    disabled={classItem.status === 'approved' || classItem.status === 'denied'}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handlePermission(classItem._id, 'denied')}
                    className={`px-4 py-2 rounded-md mr-2 mb-1 ${classItem.status === 'denied' || classItem.status === 'approved' ? 'bg-red-200 text-gray-700' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                    disabled={classItem.status === 'denied' || classItem.status === 'approved'}
                  >
                    Deny
                  </button>

                  <Link to={`/dashboard/feedback/${classItem._id}`}>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"> Send Feedback
                    </button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
