import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';

const PopularInstructors = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

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

  // Filter and sort classes based on available seats
  const sortedClasses = classes
    .filter(classItem => classItem.availableSeats > 0)
    .sort((a, b) => a.availableSeats - b.availableSeats)
    .slice(0, 6);

  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Top Instructors</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {sortedClasses.map(classItem => (
            <motion.div
              key={classItem._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8, rotate: -20, borderRadius: "100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 bg-opacity-90 rounded-lg overflow-hidden cursor-pointer transform hover:shadow-xl transition-transform duration-300"
              style={{
                backgroundImage: `url(${classItem.classImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="avatar flex justify-center py-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img src={user?.photoURL} alt="Instructor" className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{classItem.instructorName}</h2>
                <p className="text-gray-200">Class Name: {classItem.className}</p>
                <p className="text-gray-200">Email: {classItem.instructorEmail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>


  );
};

export default PopularInstructors;
