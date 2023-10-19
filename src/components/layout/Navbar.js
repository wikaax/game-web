import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const Navbar = ({ isAuthenticated }) => {
    console.log("Is Authenticated:", isAuthenticated);
    return (
        <nav className="nav-wrapper pink darken-4">
            <div className="container">
                <Link to='/' className="brand-logo">Game Web</Link>
                {isAuthenticated ? <SignedInLinks isAuthenticated={isAuthenticated} /> : <SignedOutLinks isAuthenticated={isAuthenticated} />}
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
