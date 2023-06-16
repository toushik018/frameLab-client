import React, { useContext } from 'react';
import useClass from '../../../Hooks/useClass';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';



const SelectedClasses = () => {
    const [classes, refetch] = useClass();
    const { user } = useContext(AuthContext);
    useTitle('Selected Classes')

    const total = classes.reduce((sum, classItem) => classItem.price + sum, 0)

    console.log(classes);

    const handleDeleteClass = (classes) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://frame-lab-server.vercel.app/selectedClasses/${classes._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                        }
                    });
            }
        });
    };


    return (
        <div className="container mx-auto py-8 px-10">
            <div className='flex justify-evenly bg-gray-100 mb-4 p-4 rounded-lg'>
                <h1 className="text-3xl font-bold text-center ">My Selected Classes: {classes?.length} </h1>
                <h1 className="text-3xl font-bold text-center">My Total Price: ${total.toFixed(2)}</h1>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {classes.map((classes) => (
                    <div
                        key={classes._id}
                        className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
                    >
                        <img
                            src={classes.image}
                            alt={classes.className}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{classes.name}</h2>
                            <p className="text-gray-600">Instructor: {classes.instructor}</p>
                            <p className="text-gray-600">Price: ${classes.price}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-red-500 hover:text-red-600 focus:outline-none"
                                    onClick={() => handleDeleteClass(classes)}
                                >
                                    Delete
                                </button>
                                <Link to={`/dashboard/payment/${classes._id}`}>
                                    <button
                                        className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                    >
                                        Pay
                                    </button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectedClasses;
