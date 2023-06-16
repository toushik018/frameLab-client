import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useTitle from '../../../Hooks/useTitle';

const AllInstructors = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  useTitle('All Instructors')

  useEffect(() => {
    fetch('https://frame-lab-server.vercel.app/classes')
      .then(response => response.json())
      .then(data => {
        setClasses(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Instructors</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map(classItem => (
            <motion.div
              key={classItem._id}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="avatar flex justify-center py-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img src={user?.photoURL} alt="User" className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{classItem.instructorName}</h2>
                <p className="text-gray-600">Class Name: {classItem.className}</p>
                <p className="text-gray-600">Email: {classItem.instructorEmail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInstructors;
