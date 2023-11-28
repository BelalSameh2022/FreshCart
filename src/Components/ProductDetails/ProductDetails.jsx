import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { BallTriangle, FallingLines } from 'react-loader-spinner';
import { WishContext } from '../../Context/WishContext';

export default function ProductDetails() {
    let { addProductToCart, setCartCounter } = useContext(CartContext);

    const [loading, setLoading] = useState(false);

    async function addToCart(id) {
        setLoading(true);
        let { data } = await addProductToCart(id);
        setLoading(false);
        if (data.status === "success") {
            setCartCounter(data.numOfCartItems);
            toast.success("The product is added successfully", {
                duration: 4000,
                position: 'top-center'
            });
        } else {
            toast.error("Adding the product is failed");
        }
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };
    let parameters = useParams();
    let { data, isError, isLoading } = useQuery("productDetails", () => getProductDetails(parameters.id));
    // console.log(data?.data.data);

    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    // 
    let { addProductToWish, setWishCounter, wishCounter, getLoggedUserWish, removeWishItem, isChecked, setIsChecked } = useContext(WishContext);
    async function addToWish(id) {
        if (!isChecked) {
            let { data } = await addProductToWish(id);
            if (data.status === 'success') {
                setWishCounter(wishCounter + 1);
                setIsChecked(true);
                toast.success('Added successfully to wish list', {
                    duration: 4000,
                    position: 'top-center'
                });
            } else {
                toast.error("Adding the product is failed");
            }

        } else {
            let { data } = await removeWishItem(id);
            if (data.status === 'success') {
                setWishCounter(wishCounter - 1);
                setIsChecked(false);
                toast.success('Removed successfully from wish list');
            } else {
                toast.error("Removing the product is failed");
            }
        }
    }


    return <>
        {data?.data.data ? <div className="container my-5">
            <Helmet>
                <title>{data?.data.data.title}</title>
            </Helmet>
            <div className="row align-items-center">
                <div className="col-md-4">
                    <Slider {...settings} className='cursor-grab'>
                        {data?.data.data.images.map((img) => <img src={img} alt={data?.data.data.title} className='w-100' />)}
                    </Slider>
                </div>
                <div className="col-md-8">
                    <h3 className='h5'>{data?.data.data.title}</h3>
                    <p className='text-muted fs-7'>{data?.data.data.description}</p>
                    <span className='text-main'>{data?.data.data.category.name}</span>
                    <div className='d-flex justify-content-between mb-3'>
                        <span>{data?.data.data.price} EGP</span>
                        <span>
                            <i className='fa-solid fa-star rating-color me-1'></i>
                            {data?.data.data.ratingsAverage}
                        </span>
                    </div>
                    <div className='row g-2 align-items-center justify-content-between'>
                        <div className="col-11">
                            {loading ? <button type="button" className='btn btn-main btn-sm w-100'><FallingLines
                                color="#fff"
                                width="25"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /></button> : <button onClick={() => addToCart(data?.data.data.id)} type="button" className='btn btn-main btn-sm w-100'>ADD TO CART</button>}

                        </div>
                        <div className="col-1 text-center pe-0">
                            {/* <i className="fa-regular fa-heart fa-2xl cursor-pointer"></i> */}
                            {/*  */}
                            <i onClick={() => { addToWish(data?.data.data.id); }} id={data?.data.data.id} className={isChecked ? "fa-solid fa-heart fa-2xl cursor-pointer text-danger" : "fa-regular fa-heart fa-2xl cursor-pointer"}></i>
                            {/*  */}
                        </div>
                    </div>
                </div>
            </div>
        </div> : <div className='preloader'>
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
        </div>}
    </>
}
