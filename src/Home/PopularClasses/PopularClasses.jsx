import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useClass from '../../Hooks/useClass';

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  const classesRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, refetch] = useClass();
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = classItem => {
    if (classItem.availableSeats === 0) {
      return; // Do nothing if available seats are 0
    }

    if (user && user.email) {
      const classInfo = {
        image: classItem.classImage,
        name: classItem.className,
        title: classItem.title,
        price: classItem.price,
        students: classItem.students,
        description: classItem.description,
        availableSeats: classItem.availableSeats,
        instructor: classItem.instructorName,
        email: user.email,
        instructorId: classItem?.instructorId,
        classId: classItem._id,
      };

      fetch('https://frame-lab-server.vercel.app/selectedClasses', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(classInfo)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            refetch();
            const updatedClasses = classes.map(item => {
              if (item._id === classItem._id) {
                return {
                  ...item,
                  availableSeats: item.availableSeats - 1
                };
              }
              return item;
            });
            setClasses(updatedClasses);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your class has been added',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please Login to select the class',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now!'
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };

  useEffect(() => {
    fetch('https://frame-lab-server.vercel.app/approved-classes')
      .then(response => response.json())
      .then(data => {
        // Sort classes based on the number of students enrolled
        const sortedClasses = data.sort((a, b) => b.enrolled - a.enrolled);
        // Slice the top 6 classes
        const topSixClasses = sortedClasses.slice(0, 6);
        setClasses(topSixClasses);
        console.log(topSixClasses);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-4/5 mx-auto mb-16">
      <h1 className="text-2xl font-bold mb-4">Popular Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(classItem => (
          <div
            key={classItem._id}
            className={'bg-white rounded-lg shadow-lg overflow-hidden'}
          >
            <img
              src={classItem.classImage}
              alt={classItem.className}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{classItem.className}</h2>
              <p>Instructor: {classItem.instructorName}</p>
              <p>Available Seats: {classItem.availableSeats}</p>
              <p>Price: ${classItem.price}</p>
              <p>Students: {classItem.enrolled}</p>

              <button
                onClick={() => handleSelect(classItem)}
                disabled={classItem.availableSeats === 0}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 ${
                  classItem.availableSeats === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {classItem.availableSeats === 0 ? 'Sold Out' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
