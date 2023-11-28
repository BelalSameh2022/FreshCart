import axios from "axios";
import { createContext, useState } from "react";

export let WishContext = createContext();
export default function WishContextProvider(props) {

    const [wishCounter, setWishCounter] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

    let userToken = localStorage.getItem("userToken");
    let headers = {
        token: userToken
    }

    function addProductToWish(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function getLoggedUserWish() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((response) => {
                setWishCounter(response.data.count);
                // console.log(response);
                return response
            })
            .catch((error) => error)
    }

    function removeWishItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    return <WishContext.Provider value={{ addProductToWish, getLoggedUserWish, removeWishItem, wishCounter, setWishCounter, isChecked, setIsChecked}}>
        {props.children}
    </WishContext.Provider>
}