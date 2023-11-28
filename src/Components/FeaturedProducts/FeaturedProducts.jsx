import React, { useContext, useEffect, useState } from 'react';
import Style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle, FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';


export default function FeaturedProducts() {

    // =======================> Cart <=======================
    const [btnLoading, setBtnLoading] = useState(false);
    let { addProductToCart, setCartCounter } = useContext(CartContext);
    async function addToCart(id) {
        setBtnLoading(true);
        let { data } = await addProductToCart(id);
        setBtnLoading(false);
        if (data?.status === "success") {
            setCartCounter(data.numOfCartItems);
            toast.success("The product is added successfully", {
                duration: 4000,
                position: 'top-center'
            });
        } else {
            toast.error("Adding the product is failed");
        }
    }


    // =======================> Wish List <=======================
    // const [isChecked, setIsChecked] = useState(false);
    let { addProductToWish, setWishCounter, wishCounter, getLoggedUserWish, removeWishItem } = useContext(WishContext);
    async function addToWish(id) {
        if (document.getElementById(`${id}`).classList.contains("fa-regular")) {
            let { data } = await addProductToWish(id);
            if (data?.status === 'success') {
                setWishCounter(wishCounter + 1);
                document.getElementById(`${id}`).classList.replace("fa-regular", "fa-solid")
                document.getElementById(`${id}`).classList.add("text-danger")
                // setIsChecked(true);
                toast.success('Added successfully to wish list', {
                    duration: 4000,
                    position: 'top-center'
                });
            } else {
                toast.error("Adding the product is failed");
            }
        } else {
            let { data } = await removeWishItem(id);
            if (data?.status === 'success') {
                setWishCounter(wishCounter - 1);
                document.getElementById(`${id}`).classList.replace("fa-solid", "fa-regular")
                document.getElementById(`${id}`).classList.remove("text-danger")
                // setIsChecked(false);
                toast.success('Removed successfully from wish list');
            } else {
                toast.error("Removing the product is failed");
            }
        }
    }

    // const [products, setProducts] = useState(data?.data.data);
    // const [productsWithWish, setProductsWithWish] = useState([]);
    async function getWish() {
        let wish = await getLoggedUserWish();
        for (let j = 0; j < data?.data.data.length; j++) {
            for (let i = 0; i < wish?.data.data.length; i++) {
                if (wish.data.data[i]._id === data?.data.data[j]._id) {
                    data.data.data[j].color = true;
                    // console.log(data?.data.data);
                    // setIsChecked(data?.data.data[j].color);
                    // setProductsWithWish(data?.data.data)
                    // setProducts(productsWithWish)
                }
            }
        }
        // console.log(wish.data.data[0]._id);
        // console.log(data.data.data[0]._id);
    }

    // useEffect(() => {
    //     getWish();
    // }, [])

    function getFeaturedProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let { data, isLoading, isError } = useQuery('featuredProducts', getFeaturedProducts);

    return <>
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
        </div> : <div className="container mb-5">
            <div className="row g-4">
                {data?.data.data.map((product) => <div key={product.id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product p-2 cursor-pointer border rounded-3 h-100">
                        <Link to={`/productDetails/${product.id}`}>
                            <img className='w-100' src={product.imageCover} alt="product.title" />
                            <span className='text-main font-sm'>{product.category.name}</span>
                            <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                            <div className='d-flex justify-content-between mt-3 mb-2'>
                                <span>{product.price} EGP</span>
                                <span>
                                    <i className='fa-solid fa-star rating-color me-1'></i>
                                    {product.ratingsAverage}
                                </span>
                            </div>
                        </Link>
                        <div className='row g-2 align-items-center justify-content-between p-2 pt-0'>
                            <div className="col-10">
                                {btnLoading ? <button type="button" className='btn btn-main btn-sm w-100'><FallingLines
                                    color="#fff"
                                    width="25"
                                    visible={true}
                                    ariaLabel='falling-lines-loading'
                                /></button> : <button onClick={() => addToCart(product.id)} type="button" className='btn btn-main btn-sm w-100'>ADD TO CART</button>}
                            </div>
                            <div className="col-2 text-end pe-0">
                                <i onClick={() => { addToWish(product.id); getWish(); product.color = true }} id={product.id} className={product.color ? "fa-solid fa-heart text-danger fa-xl" : "fa-regular fa-heart fa-xl"}></i>
                                {/* {isChecked ? <i onClick={() => { addToWish(product.id) }} id={product.id} className="fa-solid fa-heart fa-xl text-danger"></i> : <i onClick={() => { addToWish(product.id) }} id={product.id} className="fa-regular fa-heart fa-xl"></i>} */}
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>}
    </>
}
