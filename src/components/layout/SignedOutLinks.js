import React from "react"
import { NavLink } from "react-router-dom";

const SignedOutLinks = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return (
            <ul className="right">
                <li><NavLink to='/signup'>Zarejestruj się</NavLink></li>
                <li><NavLink to='/signin'>Zaloguj się</NavLink></li>
            </ul>
        );
    }
}
 
export default SignedOutLinks;