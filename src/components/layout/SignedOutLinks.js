import React from "react"
import { NavLink } from "react-router-dom";

const SignedOutLinks = ({ isAuthenticated }) => {

    const conLog = async () => {
        console.log(isAuthenticated);
    }

    if (!isAuthenticated) {
        console.log(isAuthenticated);
        return (
            <ul className="right">
                <li><NavLink to='/signup' className="btn pink darken-2 waves-effect waves-light btn">Zarejestruj się</NavLink></li>
                <li><NavLink to='/signin' className="btn pink darken-2  waves-effect waves-light btn" onClick={conLog}>Zaloguj się</NavLink></li>
            </ul>
        );
    }
}
 
export default SignedOutLinks;