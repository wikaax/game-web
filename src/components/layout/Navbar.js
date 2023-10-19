import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const Navbar = (props) => {
    const { isAuthenticated } = props;
    const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Dodajemy state dla ładowania

    useEffect(() => {
        setLocalIsAuthenticated(isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        if (localIsAuthenticated !== undefined) {
            setLoading(false); // Ustawiamy loading na false, gdy mamy wartość isAuthenticated
        }
    }, [localIsAuthenticated]);

    if (loading) {
        return <div>Loading...</div>; // Pokaż loader podczas ładowania autentykacji
    }

    return (
        <nav className="nav-wrapper pink darken-4">
            <div className="container">
                <Link to='/' className="brand-logo">Game Web</Link>
                { isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
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
