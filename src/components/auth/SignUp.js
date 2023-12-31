import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import addUserToFirestore from '../database/users/addUserToFirestore';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import '../../styles/SignIn.css';


const SignUp = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'female',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
  });

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

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

    if (!credentials.firstName) {
      newErrors.firstName = 'Pole wymagane';
      isValid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!credentials.lastName) {
      newErrors.lastName = 'Pole wymagane';
      isValid = false;
    } else {
      newErrors.lastName = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log('Użytkownik zarejestrowany pomyślnie');
      navigate('/signin');

      const user = userCredential.user;
      const userId = auth.currentUser.uid;
      addUserToFirestore({
        id: userId,
        email: user.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        gender: credentials.gender,
        games: [],
        wishlist: [],
      });
    } catch (error) {
      console.error('Błąd podczas rejestracji użytkownika: ', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className='signInBox'>
          <form onSubmit={handleSignUp} className="white">
            <h5 className="grey-text text-darken-3">Zarejestruj się</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={handleChange} value={credentials.email} />
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field">
              <label htmlFor="password">Hasło</label>
              <input type="password" id="password" onChange={handleChange} value={credentials.password} />
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field">
              <label htmlFor="firstName">Imię</label>
              <input type="text" id="firstName" onChange={handleChange} value={credentials.firstName} />
              <span className="red-text">{errors.firstName}</span>
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Nazwisko</label>
              <input type="text" id="lastName" onChange={handleChange} value={credentials.lastName} />
              <span className="red-text">{errors.lastName}</span>
            </div>
            <div className="input-field col s12">
              <select id="gender" onChange={handleChange} value={credentials.gender}>
                <option value="other">Inna</option>
                <option value="female">Kobieta</option>
                <option value="male">Mężczyzna</option>
              </select>
            </div>
            <div className="input-field">
              <button className="btn indigo lighten-1 z-depth-0" type="submit">
                Zarejestruj
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



export default SignUp;
