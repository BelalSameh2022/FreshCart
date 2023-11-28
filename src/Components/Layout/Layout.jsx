import React from 'react';
import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Offline } from 'react-detect-offline';


export default function Layout() {
    return <>
        <Navbar />
        <div className='mt-shift'>
            <Outlet />
        </div>
        <div>
            <Offline>
                <div className='network-fail'>
                    <i className='fa-solid fa-wifi me-2'></i>
                    You are currently offline!
                </div>
            </Offline>
        </div>
        <Footer />
    </>
}
