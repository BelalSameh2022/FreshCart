import React, { useContext } from 'react';
import Style from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';


export default function Home() {
    return <>
        <Helmet>
            <title>Home</title>
        </Helmet>
        <div className="container">
            <h1 className='fw-bolder text-uppercase mb-4'>Home</h1>
        </div>
        <MainSlider />
        <CategorySlider />
        <div className="container">
            <h3 className='mb-3'>Featured Products</h3>
        </div>
        <FeaturedProducts />
    </>
}
