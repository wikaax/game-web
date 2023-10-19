import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { signIn  } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';


const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signIn(auth, credentials.email, credentials.password);
            console.log('Użytkownik został pomyślnie zalogowany');
            console.log(auth.currentUser);
            navigate('/');
        } catch (error) {
            console.error('Błąd podczas logowania użytkownika', error);
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
