import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { storeUserData } from '../../store/actions/authActions';
import fetchDataFromFirestore from '../actions/fetchDataFromFirestore';
import { getAuth } from 'firebase/auth';

const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [currentUser, setCurrentUser] = useState(null); // Nowy stan dla bieżącego użytkownika

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth(); // Pobierz obiekt autentykacji Firebase

    useEffect(() => {
        // Sprawdź, czy użytkownik jest zalogowany
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        // Odsubskrybuj zdarzenie po odmontowaniu komponentu
        return () => unsubscribe();
    }, [auth]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await dispatch(signIn(credentials));
            if (currentUser) {
                const userData = await fetchDataFromFirestore('users');
                dispatch(storeUserData(userData));
            }
            navigate('/');
        } catch (error) {
            console.error("Błąd logowania:", error);
        }
    }

    return (
        <div>
            <div className="container">
                <form onSubmit={handleSignIn} className="white">
                    <h5 className="grey-text text-darken-3">Zaloguj się</h5>
                    <div className="input-field">
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" onChange={handleChange} value={credentials.email} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" onChange={handleChange} value={credentials.password} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Zaloguj
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
