import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import React from "react"
import { NavLink } from "react-router-dom";
import { logoutSuccess, logoutError } from '../../store/actions/authActions'


const SignedInLinks = ({ isAuthenticated }) => {
    const auth = getAuth();
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        console.log("Próba wylogowania"); // Dodaj ten console.log() wewnątrz funkcji
        try {
            await signOut(auth);
            dispatch(logoutSuccess());
            console.log("Wylogowano użytkownika");
        } catch (error) {
            dispatch(logoutError(error));
            console.error("Błąd wylogowywania:", error);
        }   
    };    

    if (isAuthenticated) {
        return (
            <ul className="right">
                <li><NavLink to='/'>Moja lista</NavLink></li>
                <li><button onClick={handleSignOut}>Wyloguj się</button></li>
                <li><NavLink to='/' className='btn btn-floating pink lighten-1'>NN</NavLink></li>
            </ul>
        );
    }else {
        return null;
    }
}
 
export default SignedInLinks;