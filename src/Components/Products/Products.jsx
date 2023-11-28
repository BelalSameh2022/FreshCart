import React from 'react';
import Style from './Products.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { Helmet } from 'react-helmet';
// import { useDispatch, useSelector } from 'react-redux';
// import { decrease, increase, increaseByAmount } from '../../Redux/counterSlice';

export default function Products() {

    // let { counter } = useSelector((state) => state.counter);
    // let dispatch = useDispatch();

    return <>
        <Helmet>
            <title>Products</title>
        </Helmet>
        <div className="container">
            {/* <h3>Counter: {counter}</h3>
            <button onClick={() => dispatch(increase())} type="button" className='btn btn-success me-1'>INCREASE</button>
            <button onClick={() => dispatch(decrease())} type="button" className='btn btn-danger me-1'>DECREASE</button>
            <button onClick={() => dispatch(increaseByAmount(20))} type="button" className='btn btn-info me-1'>INCREASE BY AMOUNT</button> */}
            <h1 className='fw-bolder text-uppercase mb-4'>Products</h1>
        </div>
        <FeaturedProducts />
    </>
}
