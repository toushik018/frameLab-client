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

  // console.log('User:', user);

  const handleSelect = classItem => {
    if (user && user.email) {
      const classInfo = {
        classId: classItem.id,
        image: classItem.classImage,
        name: classItem.className,
        title: classItem.title,
        price: classItem.price,
        students: classItem.students,
        description: classItem.description,
        availableSeats: classItem.availableSeats,
        instructor: classItem.instructorName,
        email: user.email
      };

      fetch('http://localhost:5000/selectedClasses', {
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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your class has been added',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    }
    else {
      Swal.fire({
        title: 'Please Login to select the class',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }


  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(response => response.json())
      .then(data => {
        const sortedClasses = data
          .filter(classItem => classItem.status === 'approved') // Filter approved classes
          .sort((a, b) => a.students - b.students); // Sort by lowest available seats first
        setClasses(sortedClasses.slice(0, 6)); // Only show the first 6 classes
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setIsLoading(false);
      });
  }, []);

 
  console.log(classes);

  return (
    <div className="w-4/5 mx-auto mb-16">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
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
              
                <button
                  onClick={() => handleSelect(classItem)}
                  disabled={classItem.availableSeats === 0}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
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
