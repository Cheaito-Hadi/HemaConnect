import React, {useEffect, useState} from 'react'
import "./styles.css"
import {useLocation} from "react-router";
import HemaWhite from '../../../assets/SVGs/HemaWhite.svg'
import ConnectWhite from '../../../assets/SVGs/ConnectWhite.svg'

const Navbar = () => {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated')
        window.location = '/';
    }

    return (
        <nav className="navbar">
            <div className="hemaconnect-logo">
                <img src={HemaWhite} alt="Hema Logo"/>
                <img src={ConnectWhite} alt="Connect Logo"/>
            </div>
            <ul>
                <a href="/bank" className={(url === "/bank" ? " active" : "")}>Bank</a>
                <a href="/bookings" className={(url === "/bookings" ? " active" : "")}>Bookings</a>
                <a href="/" onClick={handleLogout}>Logout</a>
            </ul>
        </nav>
    );
};

export default Navbar;