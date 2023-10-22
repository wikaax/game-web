import React, { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { logoutSuccess, logoutError } from '../../store/actions/authActions';

const SignedInLinks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const currentUser = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        if (isAuthenticated && currentUser === null) {
        }
    }, [isAuthenticated, currentUser]);

    const conLog = () => {
        console.log(isAuthenticated, currentUser);
    }

    const handleSignOut = async () => {
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
                <li><NavLink to='/profile' className='btn btn-floating pink darken-2'>{currentUser.firstName}</NavLink></li>
            </ul>
        );
    } else {
        return null;
    }
}

export default SignedInLinks;
