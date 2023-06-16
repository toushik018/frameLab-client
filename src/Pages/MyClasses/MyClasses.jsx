import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // console.log(classes);

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://frame-lab-server.vercel.app/classes/instructor?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setClasses(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
          setLoading(false);
        });
    } else {
      setClasses([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (classes.length === 0) {
    return <div>No classes found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Classes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-6">Class Name</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Total Enrolled Students</th>
              <th className="py-4 px-6">Feedback</th>
              <th className="py-4 px-6">Image</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="border-b border-gray-300">
                <td className="py-4 px-6">{classItem.className}</td>
                <td className="py-4 px-6">{classItem.status}</td>
                <td className="py-4 px-6 text-center">
                  {classItem.status === 'denied' ? (
                    classItem.enrolledStudents ? classItem.enrolledStudents.length : 0
                  ) : (
                    '0'
                  )}
                </td>
                <td className="py-4 px-6">
                  {classItem.status === 'denied' ? (
                    classItem?.feedback
                  ) : (
                    '-'
                  )}
                </td>
                <td className="py-4 px-6">
                  <img src={classItem.classImage} alt={classItem.className} className="h-12 w-12 rounded-full object-cover" />
                </td>
                <td className="py-4 px-6">
                  <button className="text-blue-500 hover:text-blue-600 focus:outline-none">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
