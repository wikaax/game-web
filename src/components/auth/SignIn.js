import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(signIn(credentials));
        console.log(credentials);

        navigate('/');
    }

    const handleSignOut = () => {
        dispatch(signOut());
        console.log(credentials);
        navigate('/signin');
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
                        <button className="btn pink lighten-1 z-depth-0">Zaloguj</button>
                    </div>
                </form>
                <button onClick={handleSignOut} className="btn pink lighten-1 z-depth-0">Wyloguj się</button>
            </div>
        </div>
    );
}

export default SignIn;
