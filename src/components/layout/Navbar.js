import React from "react"
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'

const Navbar = (props) => {
    const { isAuthenticated, signOut } = props;
    console.log(props);

    return (
        <nav className="nav-wrapper pink darken-4">
            <div className="container">
                <Link to='/' className="brand-logo">Game Web</Link>
                { isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
                <SignedInLinks isAuthenticated={isAuthenticated} signOut={signOut} />
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    console.log(state.auth);
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);