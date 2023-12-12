import React from "react"
import { NavLink } from "react-router-dom";

const SignedOutLinks = ({ isAuthenticated }) => {

    const conLog = () => {
        console.log(isAuthenticated);
    }

    if (!isAuthenticated) {
        return (
            <ul className="right">
                <li><NavLink to='/signup' className="btn indigo lighten-1">Zarejestruj się</NavLink></li>
                <li><NavLink to='/signin' className="btn indigo lighten-1" onClick={conLog}>Zaloguj się</NavLink></li>
            </ul>
        );
    }
}
 
export default SignedOutLinks;