import React from 'react';
import Style from './Footer.module.css';

// import applestore from '../../assets/images/apple-store.png';
// import googlestore from '../../assets/images/google-store.png';
// import amazonpay from '../../assets/images/amazon-pay.png';
// import americanexpress from '../../assets/images/american-express.png';
// import mastercard from '../../assets/images/mastercard.png';
// import paypal from '../../assets/images/paypal.png';


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
                    <div className='col-md-6'>
                        <h6 className='mb-0'>Payment Partners</h6>
                        <div>
                            {/* <img src={amazonpay} alt="amazon-pay" className='w-25' />
                            <img src={americanexpress} alt="american-express" className='w-25' />
                            <img src={mastercard} alt="master-card" className='w-25' />
                            <img src={paypal} alt="pay-pal" className='w-25' /> */}
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <h6 className='mb-0'>Get deliveries with FreshCart</h6>
                        <div>
                            {/* <img src={applestore} alt="apple-store" className='w-25' />
                            <img src={googlestore} alt="google-store" className='w-25' /> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
