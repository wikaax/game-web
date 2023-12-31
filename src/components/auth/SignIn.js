import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import fetchDataFromFirestore from '../actions/fetchDataFromFirestore';
import { getAuth } from 'firebase/auth';
import '../../styles/SignIn.css';
import { updateUser, storeUserData } from '../../store/actions/authActions';


const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(updateUser(user));
            }
        });
        return () => unsubscribe();
    }, [auth, dispatch]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!credentials.email) {
            newErrors.email = 'Pole wymagane';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        if (!credentials.password) {
            newErrors.password = 'Pole wymagane';
            isValid = false;
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await dispatch(signIn(credentials));
            const userData = await fetchDataFromFirestore('users');
            dispatch(storeUserData(userData));
            navigate('/');
        } catch (error) {
            console.error("Błąd logowania:", error);
        }
    }

    return (
        <div>
            <div className="container">
                <div className='signInBox'>
                    <form onSubmit={handleSignIn} className="white">
                        <h5 className="grey-text text-darken-3">Zaloguj się</h5>
                        <div className="input-field">
                            <label htmlFor="email">email</label>
                            <input type="email" id="email" onChange={handleChange} value={credentials.email} />
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">password</label>
                            <input type="password" id="password" onChange={handleChange} value={credentials.password} />
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field">
                            <button className="btn indigo lighten-1 z-depth-0">
                                Zaloguj
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
