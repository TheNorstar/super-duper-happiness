import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import "./App.css";
import arrow from './images/blue arrow.png';
import Stefan from "./images/Stefan.jpg";
import Dani from "./images/Dani.jpg";
import Alex from "./images/Alex.jpg";
import Denisa from "./images/Denisa.jpg";

class SendBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <form className = "submitButton" onSubmit = {this.props.handleNewMessage}>
                <div className = "sendBox">
                    <input id = "messageInput" type="text" name="name" />
                    <button  className = "sendButton">
                        <FontAwesomeIcon icon = {faAngleRight}/>
                    </button>
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
            <div className = {this.props.selfMessage? "selfMessageBox": "otherMessageBox"}>
                <div className = {this.props.selfMessage? "selfMessage": "otherMessage"}>
                    <h5 className = "MessageMetaData">{this.props.user} said at {this.props.date}</h5>
                    <p className = "Message">{this.props.message}</p>
                </div>
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
        dateString += ((el[2].getHours() < 10)? "0"+ el[2].getHours():el[2].getHours()) + ":";
        dateString += (el[2].getMinutes() < 10)? "0"+ el[2].getMinutes():el[2].getMinutes();
        return dateString;
    }
    render () {
        return (
            <div className = "ChatLogWrapper">
                <div className = "ChatLog">
                    {this.props.chatHistory.map((el, index) => (
                        <Message key = {el[0]+el[1]+el[2].getMilliseconds()} user = {el[0]} date = {this.formatDate(el)} message = {el[1]} selfMessage = {this.props.user === el[0]} />
                    ))}
                </div>
            </div>
        )
    }
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        let chatHistory = document.getElementsByClassName("ChatLogWrapper")[0];
        console.log(chatHistory.scrollHeight);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    render () {
        return (
            <div className = "ChatBox">
                <div className = "userBanner"> 
                    <img src={this.props.profilePicture} className = "profilePic"/>
                    <h1>{this.props.activeChat}</h1>
                </div>
                <ChatLog chatHistory = {this.props.chatHistory} user = {this.props.user}/>
                <SendBox handleNewMessage = {this.props.handleNewMessage}/>
            </div>
        )
    }
}
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

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        console.log(e.target.children[1].innerHTML);
        this.props.changeChat(e.target.children[1].innerHTML.trim());
    }
    render () {
        return (
            <div className = "ChatList">
                {this.props.contacts.map( el => (
                    <div className = "chatItemWrapper" key = {el}>
                    <div className = "chatItem" onClick = {this.handleClick} >
                        <img src = {this.props.profilePictures[el]} className = "profilePic"/>
                        <h1> {el} </h1>
                    </div>
                    <div className = "horizontalRuler">
                    </div>
                    </div>
                ))}
            </div>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn : false, 
            user : "",
            contacts : ["Stefan", "Alex", "Dani", "Denisa"],
            profilePictures : {
                "Stefan" : Stefan, 
                "Alex" : Alex,
                "Dani" : Dani, 
                "Denisa" : Denisa
            },
            chatHistory : {
                "Stefan" : [],
                "Alex" : [],
                "Dani" : [], 
                "Denisa" : []
            },
            activeChat : "Denisa"
        }
        this.handleLogIn = this.handleLogIn.bind(this);
        this.changeChat = this.changeChat.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleLogIn () {
        this.setState({LoggedIn : !this.state.LoggedIn, user : document.getElementById("usernameInput").value});
    }

    changeChat (contact) {
        console.log(contact, typeof contact, contact.length)
        this.setState({activeChat : contact});
    }
    handleNewMessage(e) {
        e.preventDefault();
        let updatedChatHistory = Object.assign({}, this.state.chatHistory)
        updatedChatHistory[this.state.activeChat].push([this.state.user, document.getElementById("messageInput").value, new Date()]);
        console.log(document.getElementById("messageInput").value);
        document.getElementById("messageInput").value = "";
        console.log(document.getElementById("messageInput").value);
        this.setState({chatHistory : updatedChatHistory});

    }
    render () {
        return (
            <div className = "App">
                <div className = "siteHeader">
                    <h2>My Website</h2>
                </div>
                <div className = "siteContent">
                    {this.state.LoggedIn &&
                        <div className = "ChatWrapper">
                            <ChatList 
                                    contacts = {this.state.contacts} 
                                    profilePictures = {this.state.profilePictures}  
                                    changeChat = {this.changeChat}
                             />
                            <ChatBox 
                                    user = {this.state.user}
                                    activeChat = {this.state.activeChat} 
                                    profilePicture = {this.state.profilePictures[this.state.activeChat]} 
                                    chatHistory = {this.state.chatHistory[this.state.activeChat]}
                                    handleNewMessage = {this.handleNewMessage}
                            />
                        </div>
                    }
                    {!this.state.LoggedIn &&
                        <LogInPanel LoggedIn={this.state.LoggedIn} handleLogIn={this.handleLogIn} />
                    }
                </div>
                </div>
        )
    }
}

export default App;
