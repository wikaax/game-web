import React from "react"
import { NavLink } from "react-router-dom";

const SignedOutLinks = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return (
            <ul className="right">
                <li><NavLink to='/signup' className="btn pink darken-2 waves-effect waves-light btn">Zarejestruj się</NavLink></li>
                <li><NavLink to='/signin' className="btn pink darken-2  waves-effect waves-light btn">Zaloguj się</NavLink></li>
            </ul>
        );
    }
}
 
export default SignedOutLinks;