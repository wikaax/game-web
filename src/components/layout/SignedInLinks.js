import React from "react"
import { NavLink } from "react-router-dom";

const SignedInLinks = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return (
            <ul className="right">
                <li><NavLink to='/'>Moja lista</NavLink></li>
                <li><NavLink to='/'>Wyloguj się</NavLink></li>
                <li><NavLink to='/' className='btn btn-floating pink lighten-1'>NN</NavLink></li>
            </ul>
        );
    }else {
        return null;
    }
}
 
export default SignedInLinks;