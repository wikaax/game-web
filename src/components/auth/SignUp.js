import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            console.log('Użytkownik został pomyślnie zarejestrowany');
        } catch (error) {
            console.error('Błąd podczas rejestracji użytkownika', error);
        }
    };

    return (
        <div>
            <div className="container">
                <form onSubmit={handleSignUp} className="white">
                    <h5 className="grey-text text-darken-3">Zarejestruj się</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleChange} value={credentials.email} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" id="password" onChange={handleChange} value={credentials.password} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">Imię</label>
                        <input type="text" id="firstName" onChange={handleChange} value={credentials.firstName} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Nazwisko</label>
                        <input type="text" id="lastName" onChange={handleChange} value={credentials.lastName} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" type="submit">
                            Zarejestruj
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
