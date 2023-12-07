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

    if (isAuthenticated && currentUser) {
        const initials = (currentUser.firstName && currentUser.lastName)
            ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase()
            : '';

        console.log('Inicjały:', initials);

        return (
            <ul className="right">
                <li><NavLink to='/mylist' className="btn indigo lighten-1 waves-effect waves-light btn" onClick={conLog}>Moja lista</NavLink></li>
                <li><button className="btn indigo lighten-1 waves-effect waves-light btn" onClick={handleSignOut}>Wyloguj się</button></li>
                <li><NavLink to='/profile' className='btn indigo lighten-1'>Mój profil</NavLink></li>
            </ul>
        );
    } else {
        return null;
    }
}

export default SignedInLinks;
