import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { BallTriangle, FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function Cart() {
    // let navigate = useNavigate();
    let { getLoggedUserCart, removeCartItem, updateProductQuantity, clearUserCart, setCartCounter } = useContext(CartContext);

    const [cartDetails, setCartDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    async function getCart() {
        setLoading(true);
        let { data } = await getLoggedUserCart();
        setLoading(false);
        setCartDetails(data);
    }

    async function removeItem(id) {
        let { data } = await removeCartItem(id);
        setCartDetails(data);
        if (data.status === "success") {
            setCartCounter(data.numOfCartItems);
            toast.success("The product is removed successfully", {
                duration: 4000,
                position: 'top-center'
            });
        } else {
            toast.error("Removing the product is failed");
        }
    }

    async function updateQuantity(id, count) {
        let { data } = await updateProductQuantity(id, count);
        setCartDetails(data);
        if (count === 0) {
            removeItem(id);
        }
    }

    async function clearCart() {
        setBtnLoading(true);
        let { data } = await clearUserCart();
        setBtnLoading(false);
        if (data.message === "success") {
            setCartDetails(null);
            // navigate('/home');
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        {cartDetails && cartDetails.numOfCartItems ? <div className="container my-3">
            <div className="p-3 bg-light">
                <h3 className='fw-bolder text-uppercase'>Shopping cart</h3>
                <div className='border-bottom p-2'>
                    <h4 className='h6'><span className='fw-bolder text-main'>Cart items:</span> {cartDetails.numOfCartItems}</h4>
                    <h4 className='h6'><span className='fw-bolder text-main'>Total cart price:</span> {cartDetails.data.totalCartPrice} EGP</h4>
                </div>
                {cartDetails.data.products.map((product) => <div key={product.product.id} className='row g-3 align-items-center py-3 border-bottom'>
                    <div className="col-md-1">
                        <img src={product.product.imageCover} alt={product.product.title} className='w-100' />
                    </div>
                    <div className="col-md-11">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='pe-2'>
                                <h3 className='h6'>{product.product.title}</h3>
                                <h6 className='h6'><span className='text-main'>Price:</span> {product.price} EGP</h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className='btn btn-count'>+</button>
                                <span className='fs-5 mx-2'>{product.count}</span>
                                <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className='btn btn-count'>-</button>
                            </div>
                        </div>
                        <button onClick={() => removeItem(product.product.id)} className='btn btn-remove'>
                            <i className="fa-regular fa-trash-can text-danger font-sm"></i> Remove
                        </button>
                    </div>
                </div>)}
                <div className='d-flex justify-content-end'>
                    <Link to="/address" type="button" className='btn btn-outline-primary mt-3 ms-2'>CHECK OUT</Link>
                    {btnLoading ? <button type="button" className='btn btn-danger mt-3 ms-2'><FallingLines
                        color="#fff"
                        width="25"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    /></button> : <button onClick={() => clearCart()} type="button" className='btn btn-outline-danger mt-3 ms-2 '>CLEAR CART</button>}
                </div>


            </div>
        </div> : <div className="container my-4">
            <div className="bg-light">
                <p className='h2 p-5 fw-bolder min-vh'>Your cart is empty!</p>
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
