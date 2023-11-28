import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import CounterContextProvider from './Context/CounterContext';
import { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import AlreadyMember from './Components/AlreadyMember/AlreadyMember';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import WishList from './Components/WishList/WishList';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import WishContextProvider from './Context/WishContext';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';


function App() {

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: 'login', element: <Login /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { index: true, element: <AlreadyMember><Register /></AlreadyMember> },
        { path: 'home', element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: 'cart', element: <ProtectedRouter><Cart /></ProtectedRouter> },
        { path: 'wishList', element: <ProtectedRouter><WishList /></ProtectedRouter> },
        { path: 'brands', element: <ProtectedRouter><Brands /></ProtectedRouter> },
        { path: 'products', element: <ProtectedRouter><Products /></ProtectedRouter> },
        { path: 'categories', element: <ProtectedRouter><Categories /></ProtectedRouter> },
        { path: 'productDetails/:id', element: <ProtectedRouter><ProductDetails /></ProtectedRouter> },
        { path: 'address', element: <ProtectedRouter><Address /></ProtectedRouter> },
        { path: 'allorders', element: <ProtectedRouter><Orders /></ProtectedRouter> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return <>
    <CartContextProvider>
      <WishContextProvider>
        <CounterContextProvider>
          <Provider store={store}>
            <RouterProvider router={routes} />
            <Toaster />
          </Provider>
        </CounterContextProvider>
      </WishContextProvider>
    </CartContextProvider>
  </>
}

export default App;
