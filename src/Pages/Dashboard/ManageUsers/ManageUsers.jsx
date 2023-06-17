import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';

const ManageUsers = () => {
    useTitle('ManageUsers')

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://frame-lab-server.vercel.app/users')
        return res.json();
    })

    const makeInstructor = async (user) => {
        fetch(`https://frame-lab-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const makeAdmin = async (user) => {
        fetch(`https://frame-lab-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="text-3xl font-bold mb-4">Manage User</h1>
            <table className="table-auto w-fll lg:w-[1000px] bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">#</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td className="px-4 py-2 border-b">{index + 1}</td>
                            <td className="px-4 py-2 border-b">{user.name}</td>
                            <td className="px-4 py-2 border-b">{user.email}</td>
                            <td className="px-4 py-2 border-b">
                                <div className="flex flex-wrap justify-center">
                                    <button
                                        onClick={() => makeInstructor(user)}
                                        disabled={user.role === 'instructor' || user.role === 'admin'}
                                        className="btn btn-primary btn-sm mr-2 mb-2 sm:mb-0"
                                    >
                                        Make Instructor
                                    </button>
                                    <button
                                        onClick={() => makeAdmin(user)}
                                        disabled={user.role === 'admin'}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Make Admin
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default ManageUsers;
