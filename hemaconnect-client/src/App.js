import './App.css';
import Navbar from "./components/ui/Navbar";
import React, {useState, useEffect} from "react";
import Login from "./pages/Login";
import Bank from "./pages/Bank";
import Bookings from "./pages/Bookings";
import {Routes, Route} from "react-router-dom";

function App() {

    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);
    if (!authenticated) {
        return (
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        );
    }
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/bank" element={<Bank/>}/>
                <Route path="/bookings" element={<Bookings/>}/>
            </Routes>
        </div>
    );
}

export default App;
