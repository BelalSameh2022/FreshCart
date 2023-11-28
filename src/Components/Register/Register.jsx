import React, { useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login");
    }
  }

  let validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required.")
      .min(3, "Minimum length is 3 characters.")
      .max(20, "Maximum length is 20 characters."),
    email: yup
      .string()
      .required("Email is required.")
      .email("Enter a valid email."),
    password: yup
      .string()
      .required("Passowrd is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        `Must contain at least:
- Six characters. 
- One letter (uppercase or lowercase).
- One number.`
      ),
    rePassword: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("password")], "Enter the same password."),
    phone: yup
      .string()
      .required("Phone is required.")
      .matches(/^01[1250][0-9]{8}$/, "Invalid phone number."),
  });

  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className="container my-5">
        <form onSubmit={registerForm.handleSubmit}>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <h1 className="text-uppercase fw-bolder">Registeration</h1>
          <div className="my-3">
            <label htmlFor="name">Name:</label>
            <input
              value={registerForm.values.name}
              onBlur={registerForm.handleBlur}
              onChange={registerForm.handleChange}
              type="text"
              name="name"
              id="name"
              className="form-control mt-2"
            />
            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert alert-danger my-2 py-2">
                {registerForm.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="email">Email:</label>
            <input
              value={registerForm.values.email}
              onBlur={registerForm.handleBlur}
              onChange={registerForm.handleChange}
              type="email"
              name="email"
              id="email"
              className="form-control mt-2"
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger my-2 py-2">
                {registerForm.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="password">Password:</label>
            <input
              value={registerForm.values.password}
              onBlur={registerForm.handleBlur}
              onChange={registerForm.handleChange}
              type="password"
              name="password"
              id="password"
              className="form-control mt-2"
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <div
                className="alert alert-danger my-2 py-2"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {registerForm.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="rePassword">Re-password:</label>
            <input
              value={registerForm.values.rePassword}
              onBlur={registerForm.handleBlur}
              onChange={registerForm.handleChange}
              type="password"
              name="rePassword"
              id="rePassword"
              className="form-control mt-2"
            />
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger my-2 py-2">
                {registerForm.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="phone">Phone:</label>
            <input
              value={registerForm.values.phone}
              onBlur={registerForm.handleBlur}
              onChange={registerForm.handleChange}
              type="tel"
              name="phone"
              id="phone"
              className="form-control mt-2"
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger my-2 py-2">
                {registerForm.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="me-1">Already have an account?</span>
              <Link to="login" className="fw-bolder text-main">
                Login
              </Link>
            </div>
            {isLoading ? (
              <button type="button" className="btn btn-main">
                {/* <i className='fa-solid fa-spinner fa-spin'></i> */}
                <FallingLines
                  color="#fff"
                  width="25"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </button>
            ) : (
              <button
                disabled={!(registerForm.isValid && registerForm.dirty)}
                type="submit"
                className="btn btn-main"
              >
                REGISTER
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
