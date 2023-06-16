import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const items = [
    {
        imageUrl: 'https://i.ibb.co/42CBv1n/elephant-g8d92bc3e4-1280.jpg',
        title: 'Welcome to Our Photography School',
        description: 'Learn the art of photography and capture stunning moments.',
    },
    {
        imageUrl: 'https://i.ibb.co/TbsLNwc/spark-ge5b41b008-1280.jpg',
        title: 'Explore Your Creativity',
        description: 'Unleash your creativity and express yourself through photography.',
    },
    {
        imageUrl: 'https://i.ibb.co/kXwynDP/iphone-gbf2fc7d82-1280.jpg',
        title: 'Join Our Community',
        description: 'Connect with like-minded photographers and grow together.',
    },
    {
        imageUrl: 'https://i.ibb.co/tczQQ0h/man-g177c71553-1280.jpg',
        title: 'Master the Technical Skills',
        description: 'Learn the technical aspects of photography to enhance your skills.',
    },
    {
        imageUrl: 'https://i.ibb.co/xhbf7vk/silhouette-people-happy-time-1.jpg',
        title: 'Get Inspired by Experts',
        description: 'Gain insights and inspiration from experienced photographers.',
    },
];

const Carousel = () => (
    <AliceCarousel
        animationType="fadeout"
        animationDuration={800}
        disableButtonsControls
        infinite
        items={items.map((item, index) => (
            <div key={index} className="relative h-screen flex flex-col justify-center items-center">
                <img src={item.imageUrl} alt={`Image ${index + 1}`} className="w-full h-auto object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">{item.title}</h2>
                    <p className="text-2xl text-white">{item.description}</p>
                </div>
            </div>
        ))}
        autoPlay
        autoPlayInterval={3000}
        mouseTracking
    />

);

export default Carousel;