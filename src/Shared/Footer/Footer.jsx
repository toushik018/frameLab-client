import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="container mx-auto py-8 px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">About Us</h3>
                        <p>Welcome to our photography class website! We are passionate about capturing moments and teaching others the art of photography. Our experienced instructors are dedicated to helping you develop your skills and unleash your creativity through a range of courses.</p>
                       
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Courses</h3>
                        <ul className="list-none">
                            <li><a href="#" className="text-gray-300 hover:text-white">Beginner Photography</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Advanced Techniques</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Portrait Photography</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Landscape Photography</a></li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Contact</h3>
                        <p>123 Main Street</p>
                        <p>City, State, ZIP</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: info@example.com</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M14 3c1.104 0 2 .896 2 2v14c0 1.104-.896 2-2 2H6c-1.104 0-2-.896-2-2V5c0-1.104.896-2 2-2h8zm0 2H6v14h8V5zM8 11.5a.5.5 0 110-1h2.5V8a.5.5 0 011 0v2.5H14a.5.5 0 010 1h-2.5V14a.5.5 0 01-1 0v-2.5H8z"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M21 8a.997.997 0 01-.707-.293l-2-2A.999.999 0 0017 5H7c-.551 0-1 .449-1 1v12c0 .551.449 1 1 1h10c.551 0 1-.449 1-1v-6.586l2-2V12l-2-2v-.586l2-2V9a.997.997 0 01-.293.707l-2 2A.999.999 0 0017 12h-4.414l-2 2H17a.997.997 0 01.707.293l2 2A.999.999 0 0021 15V8zM9 16H7v-2h2v2zm4 0h-2v-2h2v2zm-4-4H7v-2h2v2zm4 0h-2v-2h2v2zm-4-4H7V6h2v2zm4 0h-2V6h2v2zm4 4h-2v-2h2v2zm0-4h-2V6h2v2zm0 0z"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10C22 6.486 17.514 2 12 2zm0 1.75a8.25 8.25 0 018.25 8.25c0 4.552-3.698 8.25-8.25 8.25S3.75 16.552 3.75 12A8.25 8.25 0 0112 3.75zm5.5 5.04c-.06-.06-.382-.236-.69-.397a1.36 1.36 0 00-1.44 0 5.35 5.35 0 00-3.663 3.253c-.198.56-.54 1.285-1.048 2.464l-.404 1.005-1.011.426C7.342 15.84 7.154 16 6.5 16h-1a1 1 0 000 2h1c.532 0 1.067-.192 1.505-.623l1.011-.426.404-1.005c.482-1.206.82-1.827 1.005-2.01a5.34 5.34 0 003.453-2.83c.133-.325.185-.556.217-.665a1 1 0 00-1.945-.51zm-5.75.963c-.574 0-1.04.466-1.04 1.04 0 .574.466 1.04 1.04 1.04.574 0 1.04-.466 1.04-1.04 0-.574-.466-1.04-1.04-1.04z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-8 border-gray-600" />
                <p className="text-center text-sm">© 2023 Photography Class. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
