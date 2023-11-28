import React, { useState } from 'react';
import Style from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';

export default function ForgetPassword() {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");

    // Forget passowrd
    let validationSchema = yup.object({
        email: yup.string().required("Email is required.").email("Enter a valid email.")
    })

    async function forgetSubmit(value) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value).catch((err) => {
            console.log(err);
        })
        setIsLoading(false);
        console.log(data);
        if (data.statusMsg === "success") {
            document.getElementById("forgetContainer").classList.add("d-none");
            document.getElementById("verifyContainer").classList.remove("d-none");
        }
    }

    let forgetForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: forgetSubmit
    })

    // Verify
    let validationSchema2 = yup.object({
        resetCode: yup.string().required("Code is required.").matches(/^[0-9]+$/, "Numbers only.")
    })

    async function verifySubmit(value) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value).catch((err) => {
            console.log(err);
            setIsError(err.response.data.message);
            setIsLoading(false)
        });
        setIsLoading(false);
        console.log(data);
        if (data.status === "Success") {
            navigate("/resetPassword");
        }
    }

    let verifyForm = useFormik({
        initialValues: {
            resetCode: ''
        },
        validationSchema: validationSchema2,
        onSubmit: verifySubmit
    })

    return <>
        {/* Forget Password */}
        <div id='forgetContainer' className="container my-5">
            <h1 className='text-uppercase fw-bolder'>Forget Password</h1>
            <form onSubmit={forgetForm.handleSubmit}>
                <div className='my-3'>
                    <label htmlFor="email">Email:</label>
                    <input onBlur={forgetForm.handleBlur} onChange={forgetForm.handleChange} type="email" name='email' id='email' className='form-control mt-2' />
                    {forgetForm.touched.email ? <span className='text-danger'>{forgetForm.errors.email}</span> : ''}
                </div>
                {isLoading ? <button type="button" className='btn btn-main d-block ms-auto'><FallingLines
                    color="#fff"
                    width="25"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                /></button> : <button disabled={!(forgetForm.isValid && forgetForm.dirty)} type="submit" className='btn btn-main d-block ms-auto'>SEND</button>}
            </form>
        </div>

        {/* Verify */}
        <div id='verifyContainer' className="container my-5 d-none">
            <h1 className='text-uppercase fw-bolder'>Verification</h1>
            {isError? <div className='alert alert-danger'>{isError}</div> : ""}
            
            <form onSubmit={verifyForm.handleSubmit}>
                <div className='my-3'>
                    <label htmlFor="resetCode">Verify-code:</label>
                    <input onBlur={verifyForm.handleBlur} onChange={verifyForm.handleChange} type="text" name='resetCode' id='resetCode' className='form-control mt-2' />
                    {verifyForm.touched.resetCode ? <span className='text-danger'>{verifyForm.errors.resetCode}</span> : ''}
                </div>
                {isLoading ? <button type="button" className='btn btn-main d-block ms-auto'><FallingLines
                    color="#fff"
                    width="25"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                /></button> : <button disabled={!(verifyForm.isValid && verifyForm.dirty)} type="submit" className='btn btn-main d-block ms-auto'>SEND</button>}
            </form>
        </div>
    </>
}
