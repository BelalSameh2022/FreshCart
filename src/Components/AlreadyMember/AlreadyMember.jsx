import React from 'react';
import Style from './AlreadyMember.module.css';
import { Navigate } from 'react-router-dom';

export default function AlreadyMember(props) {
    if (localStorage.getItem("userToken")) {
        return <Navigate to={"/home"}/>
    }
    else {
        return props.children;
    }
}
