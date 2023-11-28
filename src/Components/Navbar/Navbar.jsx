import React, { useContext, useEffect } from 'react';
import Style from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';

export default function Navbar() {

    let { cartCounter } = useContext(CartContext);
    let { wishCounter, getLoggedUserWish } = useContext(WishContext);

    let { userToken, setUserToken } = useContext(UserContext);
    let navigate = useNavigate();

    function signOut() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/login');
    }

    async function getWish() {
        await getLoggedUserWish();
    }

    useEffect(() => {
        getWish();
    }, [])


return <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div className="container">
            <Link to='home' className="navbar-brand">
                <img src={logo} alt="freshcart-logo" />
            </Link>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-wrap" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    {userToken != null ? <>
                        <li className="nav-item">
                            <NavLink to='home' className="nav-link">HOME</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='products' className="nav-link">PRODUCTS</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='categories' className="nav-link">CATEGORIES</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='brands' className="nav-link">BRANDS</NavLink>
                        </li>
                    </> : ''}
                </ul>
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className='nav-item d-flex align-items-center py-2'>
                        <i className='fa-brands me-3 fa-instagram cursor-pointer'></i>
                        <i className='fa-brands me-3 fa-facebook cursor-pointer'></i>
                        <i className='fa-brands me-3 fa-tiktok cursor-pointer'></i>
                        <i className='fa-brands me-3 fa-twitter cursor-pointer'></i>
                        <i className='fa-brands me-3 fa-linkedin cursor-pointer'></i>
                        <i className='fa-brands me-3 fa-youtube cursor-pointer'></i>
                    </li>
                    {userToken != null ? <>
                        <li className="nav-item">
                            <NavLink to='cart' className="nav-link position-relative">
                                <i className="fa-solid fa-cart-shopping fa-xl"></i>
                                <span className="my-badge badge rounded-pill bg-danger">
                                    {cartCounter}
                                </span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='wishList' className="nav-link position-relative">
                                {({ isActive }) => isActive ? <>
                                    <i className="fa-solid fa-heart fa-xl"></i>
                                    <span className="my-badge badge rounded-pill bg-danger">
                                        {wishCounter}
                                    </span>
                                </> : <>
                                    <i className="fa-regular fa-heart fa-xl"></i>
                                    <span className="my-badge badge rounded-pill bg-danger">
                                        {wishCounter}
                                    </span>
                                </>}
                            </NavLink>
                        </li>
                    </> : ''}
                    {userToken != null ? <li className="nav-item">
                        <span onClick={signOut} className="nav-link cursor-pointer">SIGNOUT</span>
                    </li> : <>
                        <li className="nav-item">
                            <NavLink to='login' className="nav-link">LOGIN</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">REGISTER</NavLink>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>
</>
}
