import React from 'react';
import "./styles.css";
import LoginForm from "../../components/ui/authenticationForms/Login";
import AnimatedIntro from "../../components/base/animated";

const Login = () => {
    return (
        <div className="full-login">
            <div className="left-right-container">
                <div className="left-container">
                    <AnimatedIntro/>
                </div>
                <div className="right-container">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};

export default Login;