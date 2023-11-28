import React, { useContext, useEffect, useState } from 'react';
import Style from './WishList.module.css';
import { Helmet } from 'react-helmet';
import { BallTriangle, FallingLines } from 'react-loader-spinner';
import { WishContext } from '../../Context/WishContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {

    // =======================> Cart <=======================
    const [btnLoading, setBtnLoading] = useState(false);
    let { addProductToCart, setCartCounter } = useContext(CartContext);

    async function addToCart(id) {
        setBtnLoading(true);
        let { data } = await addProductToCart(id);
        setBtnLoading(false);
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

    // =======================> Wish List <=======================    
    const [loading, setLoading] = useState(false);
    const [WishDetails, setWishDetails] = useState(null);
    let { getLoggedUserWish, removeWishItem, setWishCounter } = useContext(WishContext);
    
    async function getWish() {
        setLoading(true);
        let { data } = await getLoggedUserWish();
        setLoading(false);
        setWishDetails(data);
        // console.log(data);
    }

    async function removeItem(id) {
        let { data } = await removeWishItem(id);
        console.log(data);
        setWishDetails(data);
        if (data.status === "success") {
            setWishCounter(data.count);
            toast.success("The product is removed successfully", {
                duration: 4000,
                position: 'top-center'
            });
        } else {
            toast.error("Removing the product is failed");
        }
    }

    useEffect(() => {
        getWish();
    }, [])
    

    return <>
        <Helmet>
            <title>Wish List</title>
        </Helmet>
        {WishDetails && WishDetails.count ? <div className="container my-3">
            <div className="p-3 bg-light">
                <h3 className='fw-bolder text-uppercase border-bottom pb-3'>Wish List</h3>
                {WishDetails.data.map((product) => <div key={product.id} className='row align-items-center py-3 border-bottom'>
                    <div className="col-md-2">
                        <img src={product.imageCover} alt={product.title} className='w-100' />
                    </div>
                    <div className="col-md-10">
                        <div>
                            <h3 className='h6'>{product.title}</h3>
                            <h6 className='h6 mb-4'><span className='text-main'>Price:</span> {product.price} EGP</h6>
                            {btnLoading ? <button type="button" className='btn btn-main btn-sm me-1'><FallingLines
                                color="#fff"
                                width="25"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /></button> : <button onClick={() => addToCart(product.id)} type="button" className='btn btn-main btn-sm me-1'>
                                <i className="fa-solid fa-cart-shopping"></i> ADD TO CART
                            </button>}
                            <button onClick={() => { removeItem(product.id); setWishCounter(WishDetails.count); getWish() }} className='btn btn-danger btn-sm me-1'>
                                <i className="fa-regular fa-trash-can font-sm"></i> REMOVE
                            </button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div> : <div className="container my-4">
            <div className="bg-light">
                <p className='h2 p-5 fw-bolder min-vh'>Your wish list is empty!</p>
            </div>
        </div>}

        {loading ? <div className='preloader'>
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
        </div> : ''}
    </>
}
