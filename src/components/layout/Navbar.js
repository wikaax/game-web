import React from "react"
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { isAuthenticated } = props;
    console.log(props);

    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Game Web</Link>
                { isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
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
 
export default connect(mapStateToProps)(Navbar);