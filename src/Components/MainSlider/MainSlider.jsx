import React from 'react';
import Style from './MainSlider.module.css';
import Slider from "react-slick";
import slide1 from '../../assets/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/slider-image-2.jpeg';
import slide3 from '../../assets/images/slider-image-3.jpeg';
import sideImg1 from '../../assets/images/grocery-banner-2.jpeg';
import sideImg2 from '../../assets/images/slider-2.jpeg';


export default function MainSlider() {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: false
            }
        }]
    };
    return <>
        <div className="container mb-5">
            <div className="row gx-0">
                <div className="col-md-8">
                    <Slider {...settings} className='cursor-grab'>
                        <img src={slide1} alt="FreshCart" className='w-100' height={400} />
                        <img src={slide2} alt="FreshCart" className='w-100' height={400} />
                        <img src={slide3} alt="FreshCart" className='w-100' height={400} />
                    </Slider>
                </div>
                <div className="col-md-4">
                    <img src={sideImg1} alt="FreshCart" className='w-100' height={200} />
                    <img src={sideImg2} alt="FreshCart" className='w-100' height={200} />
                </div>
            </div>
        </div>
    </>
}
