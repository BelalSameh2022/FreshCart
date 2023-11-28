import React, { useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Brands() {

    const [brandName, setBrandName] = useState('');
    const [brandImg, setBrandImg] = useState('');

    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let { data, isError, isLoading } = useQuery("allBrands", getAllBrands);

    return <>
        <Helmet>
            <title>Brands</title>
        </Helmet>
        {isLoading ? <div className='preloader'>
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
        </div> : <div className="container my-5">
            <h1 className='fw-bolder text-uppercase mb-4'>Brands</h1>
            <div className="row g-4">
                {data?.data.data.map((brand) => <div key={brand._id} className='col-xl-3 col-md-4 col-sm-6'>
                    <div onClick={() => { setBrandImg(brand.image); setBrandName(brand.name) }} className='product cursor-pointer rounded border' data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src={brand.image} alt={brand.name} className='w-100 rounded' />
                    </div>
                </div>)}
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-md-6 ps-4">
                                    <h1 className='h2 text-main text-uppercase fw-bolder'>{brandName}</h1>
                                    <p>{brandName}</p>
                                </div>
                                <div className="col-md-6">
                                    <img src={brandImg} alt={brandName} className='w-100' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>
}
