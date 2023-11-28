import React, { useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Categories() {

    const [subCategories, setSubCategories] = useState(null);
    const [isLoading2, setIsLoading2] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data, isError, isLoading } = useQuery('allCategories', getAllCategories);

    async function getAllSubCategorisOnCategory(categoryId) {
        setIsLoading2(true);
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
        setSubCategories(response.data.data);
        setIsLoading2(false);
    }


    return <>
        <Helmet>
            <title>Categories</title>
        </Helmet>
        {isLoading ? <div className='preloader'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div> : <div className="container my-5">
            <h1 className='fw-bolder text-uppercase mb-4'>Categories</h1>
            <div className="row g-4">
                {data?.data.data.map((category) => <div key={category._id} className='col-xl-3 col-md-4 col-sm-6'>
                    <div onClick={() => { getAllSubCategorisOnCategory(category._id); setCategoryName(category.name) }} className='product cursor-pointer rounded-4 border'>
                        <img src={category.image} alt={category.name} className='w-100 rounded-top-4 border-bottom' height={370} />
                        <h3 className='text-center fw-bolder my-3 text-main'>{category.name}</h3>
                    </div>
                </div>)}
            </div>
        </div>}
        {isLoading2 ? <div className='preloader'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div> : <div className="container mb-4">
            {categoryName ? <h2 className='fw-bolder text-center mb-4 text-main'>{categoryName} Subcategories</h2> : ''}
            <div className="row g-4">
                {subCategories?.map((subCategory) => <div key={subCategory._id} className='col-xl-3 col-md-4 col-sm-6'>
                    <div className='product cursor-pointer rounded-4 border d-flex justify-content-center align-items-center h-100 p-2'>
                        <h3 className='text-center fw-bolder my-3'>{subCategory.name}</h3>
                    </div>
                </div>)}
            </div>
        </div>}
    </>
}
