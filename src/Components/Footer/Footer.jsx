import React from 'react';
import './Footer.css';

import amazonpay from '../../assets/images/footer1.png';
import americanexpress from '../../assets/images/footer2.png';
import mastercard from '../../assets/images/footer3.png';
import paypal from '../../assets/images/footer4.png';
import applestore from '../../assets/images/footer5.png';
import googlestore from '../../assets/images/footer6.png';


export default function Footer() {
    return <>
        <footer className='bg-light'>
            <div className="container py-5">
                <h2>Get the FreshCart app</h2>
                <p className='text-muted'>we will send you a link, open it in your phone to download the app.</p>
                <div className='row g-2 border-bottom pb-3'>
                    <div className="col-lg-10 col-md-9">
                        <input type="email" name="email" id="email" placeholder='Email' className='form-control' />
                    </div>
                    <div className="col-lg-2 col-md-3">
                        <button type="button" className='btn btn-main d-block ms-auto'>Share App Link</button>
                    </div>
                </div>
                <div className='row g-3 border-bottom p-4 mb-3'>
                    <div className='col-md-6 template'>
                        <h6 className='mb-0 me-1'>Payment Partners</h6>
                        <div className='img-container1'>
                            <img src={amazonpay} alt="amazon-pay" />
                            <img src={americanexpress} alt="american-express" />
                            <img src={mastercard} alt="master-card" />
                            <img src={paypal} alt="pay-pal" />
                        </div>

                    </div>
                    <div className='col-md-6 template'>
                        <h6 className='mb-0 me-1'>Get deliveries with FreshCart</h6>
                        <div className='img-container2'>
                            <img src={applestore} alt="apple-store" />
                            <img src={googlestore} alt="google-store" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
