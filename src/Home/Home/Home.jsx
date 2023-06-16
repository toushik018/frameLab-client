import React from 'react';
import Carousel from '../Carousel/Carousel';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from './PopularInstructors/PopularInstructors';
import Footer from '../../Shared/Footer/Footer';
import Reviews from './Review/Reviews';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home; <h2>This is Home</h2>