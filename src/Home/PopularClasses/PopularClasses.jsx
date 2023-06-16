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

  // console.log('User:', user);

  const handleSelect = classItem => {
    if (user && user.email) {
      const classInfo = {
        classId: classItem.id,
        image: classItem.image,
        name: classItem.name,
        title: classItem.title,
        price: classItem.price,
        students: classItem.students,
        description: classItem.description,
        email: user.email
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
    fetch('popularClasses.json')
      .then((response) => response.json())
      .then((data) => {
        const sortedClasses = data.sort((a, b) => b.students - a.students);
        setClasses(sortedClasses);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div ref={classesRef} className='mb-20 w-4/5 mx-auto'>
      <h2 className='text-4xl font-bold text-center mt-20 mb-4 julius'>Popular Classes</h2>
      <p className='text-xl font-light text-center mb-8'>Explore Our Most Popular Photography Classes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden relative"
          >
            <div className="w-full h-full">
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{classItem.title}</h3>
              <p className="text-white">{classItem.description}</p>
              <p className="text-white mt-2">Students: {classItem.students}</p>
              <p className="text-white mt-2">Price: ${classItem.price}</p>
              <div>
                <button onClick={() => handleSelect(classItem)} className='bg-black px-4 text-white rounded-lg p-1 hover:bg-gray-600 text-center'>Select</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
