// import { connect } from 'react-redux';
// import { signIn } from '../../store/actions/authActions';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebaseConfig';

// export const SignIn = (credentials) => {
//   return async (dispatch) => {
//     try {
//       await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
//       dispatch(signIn(credentials));
//     } catch (error) {
//       console.error('Błąd podczas logowania: ', error);
//     }
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signIn: (creds) => dispatch(signIn(creds))
//   };
// };

// export default connect(null, mapDispatchToProps)(SignIn);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

export class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
        console.log(this.state)
    }
  render() {
    return (
      <div>
        <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Zaloguj się</h5>
                <div className="input-field">
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Zaloguj</button>
                </div>
            </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)