import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import '../../styles/Navbar.css'

const Navbar = (props) => {
    const { isAuthenticated } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="nav-wrapper">
            <div className="container">
                <Link to='/' className="brand-logo">Game Web</Link>
                {isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
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
