import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
export default function CartContextProvider(props) {

    const [cartId, setCartId] = useState('');

    async function getCart() {
        let { data } = await getLoggedUserCart();
        // console.log(data);
        // console.log(data?.data._id);
        setCartId(data?.data._id);
    }

    useEffect(() => {
        getCart();

    }, [])


    let userToken = localStorage.getItem("userToken");
    let headers = {
        token: userToken
    }

    const [cartCounter, setCartCounter] = useState(0);

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                setCartCounter(response.data.numOfCartItems);
                // console.log(response.data.numOfCartItems);
                return response
            })
            .catch((error) => error)
    }

    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function updateProductQuantity(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function checkOut(cartId, url, values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: values
        }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function clearUserCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                setCartCounter(0);
                return response
            })
            .catch((error) => error)
    }


    return <CartContext.Provider value={{ addProductToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, clearUserCart, cartCounter, setCartCounter, checkOut, cartId }}>
        {props.children}
    </CartContext.Provider>
}