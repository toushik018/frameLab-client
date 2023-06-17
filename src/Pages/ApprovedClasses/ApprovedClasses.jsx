import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useClass from '../../Hooks/useClass';
import useTitle from '../../Hooks/useTitle';

const ApprovedClasses = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [, refetch] = useClass();
    useTitle('Approved Classes')

    useEffect(() => {
        fetch('https://frame-lab-server.vercel.app/approved-classes')
            .then(response => response.json())
            .then(data => {
                setClasses(data);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
            });
    }, []);

    const handleSelect = classItem => {
        
        if (user && user.email) {
            const classInfo = {
                image: classItem.classImage,
                name: classItem.className,
                title: classItem.title,
                price: classItem.price,
                students: classItem.students,
                description: classItem.description,
                availableSeats: classItem.availableSeats,
                classId: classItem._id,
                instructor: classItem.instructorName,
                email: user.email,
                instructorId: classItem?.instructorId,
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

    return (
        <div className="w-4/5 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map(classItem => (
                    <div
                        key={classItem._id}
                        className={` rounded-lg shadow-lg overflow-hidden ${classItem.availableSeats === 0 ? 'bg-red-700 text-white' : ''
                            }`}
                    >
                        <img
                            src={classItem.classImage}
                            alt={classItem.className}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{classItem.className}</h2>
                            <p>Instructor: {classItem.instructorName}</p>
                            <p>Available Seats: {classItem.availableSeats - classItem.enrolled}</p>
                            <p>Price: ${classItem.price}</p>
                            <p>Enrolled: {classItem?.enrolled}</p>
                            {(!user || (user.role !== 'admin' && user.role !== 'instructor')) && (
                                <button
                                    onClick={() => handleSelect(classItem)}
                                    disabled={classItem.availableSeats === 0}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                                >
                                    {classItem.availableSeats === 0 ? 'Sold Out' : 'Select'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApprovedClasses;
