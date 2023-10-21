import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { logoutSuccess, logoutError } from '../../store/actions/authActions'


const SignedInLinks = ({ isAuthenticated }) => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth.currentUser);

    const conLog = () => {
        console.log(isAuthenticated + ' ' + currentUser);
    }

    const handleSignOut = async () => {
        console.log("Próba wylogowania"); // Dodaj ten console.log() wewnątrz funkcji
        try {
            await signOut(auth);
            dispatch(logoutSuccess());
            console.log("Wylogowano użytkownika");
            navigate('/');
        } catch (error) {
            dispatch(logoutError(error));
            console.error("Błąd wylogowywania:", error);
        }   
    };    

    if (isAuthenticated) {
        return (
            <ul className="right">
                <li><NavLink to='/' className="btn pink darken-2 waves-effect waves-light btn" onClick={conLog}>Moja lista</NavLink></li>
                <li><button className="btn pink darken-2 waves-effect waves-light btn" onClick={handleSignOut}>Wyloguj się</button></li>
                <li><NavLink to='/profile' className='btn btn-floating pink darken-2'>NN</NavLink></li>
            </ul>
        );
    }else {
        return null;
    }
}
 
export default SignedInLinks;