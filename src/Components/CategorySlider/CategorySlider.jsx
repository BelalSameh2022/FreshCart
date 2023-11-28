import React from 'react';
import Style from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
            }
        }, {
            breakpoint: 470,
            settings: {
                slidesToShow: 2,
                dots: false
            }
        }, {
            breakpoint: 300,
            settings: {
                slidesToShow: 1,
                dots: false
            }
        }]
    };

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { data, isError, isLoading } = useQuery('categorySlider', getAllCategories);

    return <>
        <div className='container mb-5 pt-3 pb-4'>
            <h3 className='mb-3'>Shop Popular Categories</h3>
            {data?.data.data ? <Slider {...settings} className='cursor-grab'>
                {data?.data.data.map((category) => {
                    return <div key={category._id}>
                        <img src={category.image} alt={category.name} className='w-100 mb-2' height={200} />
                        <h6>{category.name}</h6>
                    </div>
                })}
            </Slider> : ''}
        </div>
    </>
}
