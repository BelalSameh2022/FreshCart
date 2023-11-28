import React from 'react';
import Style from './NotFound.module.css';
import _404 from '../../assets/images/error.svg';

export default function NotFound() {
    return <>
        <div className="container my-5">
            <img src={_404} alt="Page not found!" className='mx-auto d-block' />
        </div>
    </>
}
