import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
    let { setUserToken } = useContext(UserContext);
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function loginSubmit(values) {
        setIsLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
            setIsLoading(false);
            setError(err.response.data.message);
        });
        console.log(data);
        if (data.message === 'success') {
            setIsLoading(false);
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            navigate('/home');
        }
    }

    let validationSchema = yup.object({
        email: yup.string().required("Email is required.").email("Enter a valid email."),
        password: yup.string().required("Passowrd is required.").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, `Must contain at least:
- Six characters. 
- One letter (uppercase or lowercase).
- One number.`)
    })

    let loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: loginSubmit
    })

    return <>
        <div className="container my-5">
            <form onSubmit={loginForm.handleSubmit}>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                <h1 className='text-uppercase fw-bolder'>Login</h1>
                <div className='my-3'>
                    <label htmlFor="email">Email:</label>
                    <input value={loginForm.values.email} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} type="email" name='email' id='email' className='form-control mt-2' />
                    {loginForm.errors.email && loginForm.touched.email ? <div className="alert alert-danger my-2 py-2">{loginForm.errors.email}</div> : ''}
                </div>
                <div className='my-3'>
                    <label htmlFor="password">Password:</label>
                    <input value={loginForm.values.password} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} type="password" name='password' id='password' className='form-control mt-2' />
                    {loginForm.errors.password && loginForm.touched.password ? <div className="alert alert-danger my-2 py-2" style={{ whiteSpace: "pre-wrap" }}>{loginForm.errors.password}</div> : ''}
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to='/forgetPassword' className='text-main fw-bolder'>Forget password?</Link>
                    {isLoading ? <button type="button" className='btn btn-main'><FallingLines
                        color="#fff"
                        width="25"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    /></button> : <button disabled={!(loginForm.isValid && loginForm.dirty)} type="submit" className='btn btn-main'>LOGIN</button>}
                </div>
                <span className='me-1'>Don't have an account?</span>
                <Link to='/' className='text-main fw-bolder'>Register here!</Link>
            </form>
        </div>
    </>
}
