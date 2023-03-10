import React from "react";
import {useState} from 'react';
import "./LogInPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const LogInPanel = props => {
    const [showPassword1, setShow1] = useState(false);
    const [showPassword2, setShow2] = useState(false);

    function handleChange(formName) {
        const username = document.querySelector(formName + ".usernameInput").value;
        const password = document.querySelector(formName + ".passwordInput").value;
        const submitButton = document.querySelector(formName + ".submitButton");
        if(username.length > 0 && password.length > 8){
            submitButton.disabled = false;
        }
        else{
            submitButton.disabled = true;
        }
    }

    function handleSubmit (e) {
        e.preventDefault();
        props.handleLogIn();
    }
    
    return (
        <div className = "LogInPanel">
            <form className = "logInForm" onSubmit={handleSubmit} autoComplete = "off">
                <h2 className = "logInTitle"> Log In </h2>
                <div className = "usernameWrapper">
                    <p className = "formSectionTitle"> Username: </p>
                    <input className = "usernameInput" type="text" name="user" onChange = {() => handleChange(".logInForm ")}/>
                </div>
                <div className = "passwordWrapper">
                    <p className = "formSectionTitle"> Password: </p>
                    <div className = "passwordInputWrapper">
                    <input className = "passwordInput" type={showPassword1? "text":"password"} name="password" onChange = {() => handleChange(".logInForm ")}/>
                    <div className = "eyeIconWrapper">
                        <FontAwesomeIcon icon={showPassword1? faEye : faEyeSlash} onClick = {() => setShow1(!showPassword1)} className = "eyeIcon"/>
                    </div>
                    </div>
                </div>
                <button className = "submitButton" disabled>
                    Submit
                </button>

            </form>

            <form className = "signUpForm" onSubmit={props.handleSignUp} autoComplete = "off">
                <h2 className = "signUpTitle"> Sign up </h2>
                <div className = "usernameWrapper">
                    <p className = "formSectionTitle"> Username: </p>
                    <input className="usernameInput" type="text" name="user" onChange = {() => handleChange(".signUpForm ")}/>
                </div>
                <div className = "passwordWrapper">
                    <p className = "formSectionTitle"> Password: </p>
                    <div className = "passwordInputWrapper">
                    <input className = "passwordInput" type={showPassword2? "text":"password"} name="password" onChange = {() => handleChange(".signUpForm ")}/>
                    <div className = "eyeIconWrapper">
                        <FontAwesomeIcon icon={showPassword2? faEye : faEyeSlash} onClick = {() => setShow2(!showPassword2)} className = "eyeIcon"/>
                    </div>
                    </div>
                </div>
                <button className = "submitButton" disabled>
                    Submit
                </button>

            </form>
        </div>
        );
    }


export default LogInPanel;