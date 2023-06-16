import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase/firebase.config';
import Swal from 'sweetalert2';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import useTitle from '../../Hooks/useTitle';



function Registration() {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { createUser, logOut, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(app);
    useTitle('Registration')

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(data.name, data.photoURL)
            }).then(() => {
                console.log('User profile updated');
                const saveUser = { name: data.name, email: data.email }

                fetch('https://frame-lab-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            reset();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Account successfully created, Please Login',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate('/')
                        }
                    })


            }).catch((error) => {
                console.log(error)
            });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input type="text" {...register('name', { required: true })} className="border border-gray-300 p-2 rounded-md w-full" />
                    {errors.name && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input type="email" {...register('email', { required: true })} className="border border-gray-300 p-2 rounded-md w-full" />
                    {errors.email && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*\W).*$/
                            })}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                        >
                            {showPassword ? (
                                <RiEyeOffFill className="text-gray-500 h-5 w-5" />
                            ) : (
                                <RiEyeFill className="text-gray-500 h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password?.type === 'required' && (
                        <span className="text-red-500">This field is required</span>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <span className="text-red-500">
                            Password must be at least 6 characters long
                        </span>
                    )}
                    {errors.password?.type === 'pattern' && (
                        <span className="text-red-500">
                            Password must contain at least one capital letter and one special character
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Confirm Password</label>
                    <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} {...register('confirmPassword', { required: true, validate: value => value === password })} className="border border-gray-300 p-2 rounded-md w-full" />
                        <button type="button" onClick={handleToggleConfirmPassword} className="absolute top-1/2 right-2 transform -translate-y-1/2">
                            {showConfirmPassword ? (
                                <RiEyeOffFill className="text-gray-500 h-5 w-5" />
                            ) : (
                                <RiEyeFill className="text-gray-500 h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword?.type === 'required' && <span className="text-red-500">This field is required</span>}
                    {errors.confirmPassword?.type === 'validate' && <span className="text-red-500">Passwords do not match</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Photo URL</label>
                    <input type="text" {...register('photoURL')} className="border border-gray-300 p-2 rounded-md w-full" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
            </form>
            <div className="mt-4">
                <Link to="/login" className="text-blue-500">Already have an account?</Link>
            </div>
           <SocialLogin></SocialLogin>
        </div>
    );
}

export default Registration;
