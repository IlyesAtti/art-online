import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
    const { name, setName } = props;

    const logout = async () => {
        await fetch('http://localhost:3001/api/logout', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },  
            credentials: 'include',
        });
        setName(''); 
    }

    let menu;

    if (name === '') {  
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        );
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" onClick={logout}>Logout</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active">Dashboard</Link>
                </li>
            </ul>
        );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {menu}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
