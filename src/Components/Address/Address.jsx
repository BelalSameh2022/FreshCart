import React, { useContext, useState } from 'react';
import Style from './Address.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FallingLines } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';

export default function Address() {

    let { checkOut, cartId } = useContext(CartContext);

    const [isLoading, setIsLoading] = useState(false);

    async function addressSubmit(values) {
        setIsLoading(true);
        let { data } = await checkOut(cartId, "http://localhost:3000", values);
        setIsLoading(false);
        console.log(data.session.url);
        window.location.href = data.session.url;
    }

    let validationSchema = yup.object({
        details: yup.string().required("Details is required").matches(/^[A-Za-z\d_,-,]+$/, `Only accepts letters, digits, _ or -`),
        phone: yup.string().required("Phone is required.").matches(/^01[1250][0-9]{8}$/, "Invalid phone number."),
        city: yup.string().required("City is required").matches(/^[A-Za-z]+$/, `Only accepts letters`)
    })

    let addressForm = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        validationSchema,
        onSubmit: addressSubmit
    })

    return <>
        <div className="container my-5">
            <form onSubmit={addressForm.handleSubmit}>
                {/* {error ? <div className="alert alert-danger">{error}</div> : null} */}
                <h1 className='text-uppercase fw-bolder'>Address</h1>
                <div className='my-3'>
                    <label htmlFor="details">Details:</label>
                    <input value={addressForm.values.details} onBlur={addressForm.handleBlur} onChange={addressForm.handleChange} type="text" name='details' id='details' className='form-control mt-2' />
                    {addressForm.errors.details && addressForm.touched.details ? <div className="alert alert-danger my-2 py-2">{addressForm.errors.details}</div> : ''}
                </div>
                <div className='my-3'>
                    <label htmlFor="phone">Phone:</label>
                    <input value={addressForm.values.phone} onBlur={addressForm.handleBlur} onChange={addressForm.handleChange} type="tel" name='phone' id='phone' className='form-control mt-2' />
                    {addressForm.errors.phone && addressForm.touched.phone ? <div className="alert alert-danger my-2 py-2">{addressForm.errors.phone}</div> : ''}
                </div>
                <div className='my-3'>
                    <label htmlFor="city">City:</label>
                    <input value={addressForm.values.city} onBlur={addressForm.handleBlur} onChange={addressForm.handleChange} type="text" name='city' id='city' className='form-control mt-2' />
                    {addressForm.errors.city && addressForm.touched.city ? <div className="alert alert-danger my-2 py-2">{addressForm.errors.city}</div> : ''}
                </div>
                {isLoading ? <button type="button" className='btn btn-main d-block ms-auto'><FallingLines
                    color="#fff"
                    width="25"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                /></button> : <button disabled={!(addressForm.isValid && addressForm.dirty)} type="submit" className='btn btn-main d-block ms-auto'>PAY NOW</button>}
            </form>
        </div>
    </>
}
