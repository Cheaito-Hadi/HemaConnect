import React from 'react';
import "./styles.css";
import Input from "../../../base/Input";
import Button from "../../../base/Button";
import Hema from '../../../../assets/SVGs/Hema.svg'
import Connect from '../../../../assets/SVGs/Connect.svg'


const LoginForm = () => {
    return (
        <div className="login-form">
            <div className="login-container">
                <div>
                    <img src={Hema} alt="Hema Logo"/>
                    <img src={Connect} alt="Hema Logo"/>
                </div>
                <div className="cred-btn-wrapper">
                    <div>
                    <Input
                        placeholder="Email"
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                    />
                    </div>
                    <Button
                        label="Login"
                    />
                </div>
            </div>

        </div>
    );
};

export default LoginForm;
