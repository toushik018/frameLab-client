import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation } from 'swiper/core';

SwiperCore.use([Navigation]);

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            name: 'John Doe',
            quote: 'I had an amazing experience with the photography class. The instructors were knowledgeable and supportive, and the hands-on approach helped me improve my skills significantly. Highly recommended!',
            image: "https://i.ibb.co/QNg4g4y/vicky-hladynets-C8-Ta0gw-Pb-Qg-unsplash.jpg",
        },
        {
            id: 2,
            name: 'Jane Smith',
            quote: 'Joining this photography class was the best decision I made for my photography journey. The lessons were well-structured, and the practical assignments challenged me to think creatively. The community is incredibly supportive, and I have made lifelong friends. I cannot wait for the next level!',
            image: "https://i.ibb.co/gjR18r2/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg",
        },
        {
            id: 3,
            name: 'Sam Johnson',
            quote: 'I had zero experience in photography before joining this class, but now I feel confident and passionate about it. The instructors patiently guided me through the fundamentals and helped me develop my unique style. It\'s been a transformative experience for me.',
            image: "https://i.ibb.co/jg6r5bH/christopher-campbell-r-DEOVt-E7v-Os-unsplash.jpg",
        },
    ];

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Students Say</h2>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <Swiper
                            slidesPerView={1}
                            navigation
                            loop
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                            }}
                        >
                            {reviews.map(review => (
                                <SwiperSlide key={review.id}>
                                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                                        <div className="flex items-center justify-center mb-4">
                                            <img className="w-16 h-16 rounded-full object-cover" src={review.image} alt="Student" />
                                        </div>
                                        <p className="text-gray-700 mb-4">{review.quote}</p>
                                        <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
