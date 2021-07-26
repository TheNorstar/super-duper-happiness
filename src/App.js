import React from "react";
import "./App.css";
import arrow from './images/blue arrow.png';

class SendBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <form className = "submitButton" onSubmit = {this.props.handleSubmit}>
                <div className = "sendBox">

                    <label>
                        <input id = "messageInput" type="text" name="name" />
                    </label>
                    <input id = "submit" type="submit" value="Submit"/>
                </div>
            </form>
        )
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className = "MessageBox">
                <h5 className = "MessageMetaData">{this.props.user} said at {this.props.date}</h5>
                <p className = "Message">{this.props.message}</p>
            </div>
        )
    }
}

class ChatLog extends React.Component {
    constructor(props) {
        super(props);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(el){
        let dateString = "";
        dateString += el[2].getHours() + ":";
        dateString += el[2].getMinutes();
        return dateString;
    }
    render () {
        return (
            <div className = "ChatLogWrapper">
                <div className = "ChatLog">
                    {this.props.messages.map((el, index) => (
                        <Message key = {el[0]+el[1]+el[2].getMilliseconds()} user = {el[0]} date = {this.formatDate(el)} message = {el[1]}/>
                    ))}
                </div>
            </div>
        )
    }
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages : [["Dragos","hai pe overcooked", new Date()],["Andreea", "ok :3", new Date()],["Stefan", "no lol", new Date()]]
        }
        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    componentDidUpdate() {
        let chatHistory = document.getElementsByClassName("ChatLogWrapper")[0];
        console.log(chatHistory.scrollHeight);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    handleNewMessage(e) {
        e.preventDefault();
        let updatedMessages = [...this.state.messages];
        updatedMessages.push([this.props.user, document.getElementById("messageInput").value, new Date()]);
        this.setState({messages : updatedMessages});

    }
    render () {
        return (
            <div className = "ChatBox">
                <ChatLog messages = {this.state.messages}/>
                <SendBox handleSubmit = {this.handleNewMessage}/>
            </div>
        )
    }
}
class LogInPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let username = document.getElementById("usernameInput").value;
        let password = document.getElementById("passwordInput").value;
        let submitButton = document.getElementById("submitButton");
        let hoverButton = document.getElementById("submitButton:hover");
        console.log(this.number);
        if(username.length > 0 && password.length > 8){
            submitButton.disabled = false;
            submitButton.style["background-color"] = "rgb(30, 30, 146)";
            
        }
        else{
            submitButton.disabled = true;
            submitButton.style["background-color"]  = "gray";
    
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
                    <br/>
                    <input id = "usernameInput" type="text" name="user" onChange = {this.handleChange}/>
                    <br/>
                    </div>
                    <div id = "passwordWrapper">
                    Password:
                    <br/>
                    <input id = "passwordInput" type="text" name="email" onChange = {this.handleChange}/>
                    <br/>
                    </div>
                    <button id = "submitButton" disabled>
                        Submit
                    </button>

                </form>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {LoggedIn : false, user : ""}
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn () {
        this.setState({LoggedIn : !this.state.LoggedIn, user : document.getElementById("usernameInput").value});
    }
    render () {
        return (
            <div className = "App">
                <div className = "siteHeader">
                    <h2>My Website</h2>
                </div>
                <div className = "siteContent">
                    {this.state.LoggedIn &&
                        <ChatBox user = {this.state.user}/>
                    }
                    {!this.state.LoggedIn &&
                        <LogInPanel LoggedIn={this.state.LoggedIn} handleLogIn={this.handleLogIn}/>
                    }
                </div>
                </div>
        )
    }
}

export default App;
