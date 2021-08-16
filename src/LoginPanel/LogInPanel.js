import React from "react";
import "./LogInPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faAngleRight} from '@fortawesome/free-solid-svg-icons';

class LogInPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {showInput : false};
    }

    handlePassword() {
        this.setState({showInput : !this.state.showInput});
    }
    handleChange() {
        let username = document.getElementById("usernameInput").value;
        let password = document.getElementById("passwordInput").value;
        let submitButton = document.getElementById("submitButton");
        let hoverButton = document.getElementById("submitButton:hover");
        console.log(this.number);
        if(username.length > 0 && password.length > 8){
            submitButton.disabled = false;
            
        }
        else{
            submitButton.disabled = true;
        }
    }

    checkPassword (text) {
        if(text.length < 8)
            return false;
        return true;
    }
    handleSubmit (e) {
        e.preventDefault();
        if(true)
            this.props.handleLogIn();
    }
    render () {
        return (
            <div className = "LogInPanel">
                <form className = "logInForm" onSubmit={this.handleSubmit}>
                    <h2 className = "logInTitle"> Log In </h2>
                    <div id = "usernameWrapper">
                        Username:
                        <input id = "usernameInput" type="text" name="user" onChange = {this.handleChange}/>
                    </div>
                    <div id = "passwordWrapper">
                        Password:
                        <input id = "passwordInput" type={this.state.showInput? "text":"password"} name="password" onChange = {this.handleChange}/>
                        <FontAwesomeIcon icon={this.state.showInput? faEye : faEyeSlash} onClick = {this.handlePassword} className = "eyeIcon"/>
                    </div>
                    <button id = "submitButton" disabled>
                        Submit
                    </button>

                </form>
            </div>
        );
    }
}

export default LogInPanel;