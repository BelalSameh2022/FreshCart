import React, { useState } from 'react';
import Style from './ResetPassword.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FallingLines } from 'react-loader-spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    let navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false);

    let validationSchema = yup.object({
        email: yup.string().required("Email is required.").email("Enter a valid email."),
        newPassword: yup.string().required("Passowrd is required.").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, `Must contain at least:
- Six characters. 
- One letter (uppercase or lowercase).
- One number.`)
    })

    async function resetSubmit(value) {
        setIsLoading(true);
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value).catch((err) => {
            console.log(err);
        });
        console.log(data);
        setIsLoading(false);
        if (data.token) {
            navigate("/login");
        }
    }

    let resetForm = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        validationSchema,
        onSubmit: resetSubmit
    })

    return <>
        <div className="container my-5">
            <h1 className='text-uppercase fw-bolder'>reset Password</h1>
            <form onSubmit={resetForm.handleSubmit}>
                <div className='my-3'>
                    <label htmlFor="email">Email:</label>
                    <input value={resetForm.values.email} onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} type="email" name='email' id='email' className='form-control mt-2' />
                    {resetForm.errors.email && resetForm.touched.email ? <div className="alert alert-danger my-2 py-2">{resetForm.errors.email}</div> : ''}
                </div>
                <div className='my-3'>
                    <label htmlFor="newPassword">New-password:</label>
                    <input value={resetForm.values.password} onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} type="password" name='newPassword' id='newPassword' className='form-control mt-2' />
                    {resetForm.errors.newPassword && resetForm.touched.newPassword ? <div className="alert alert-danger my-2 py-2" style={{ whiteSpace: "pre-wrap" }}>{resetForm.errors.newPassword}</div> : ''}
                </div>
                {isLoading ? <button type="button" className='btn btn-main d-block ms-auto'><FallingLines
                    color="#fff"
                    width="25"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                /></button> : <button disabled={!(resetForm.isValid && resetForm.dirty)} type="submit" className='btn btn-main d-block ms-auto'>SEND</button>}
            </form>
        </div>
    </>
}
