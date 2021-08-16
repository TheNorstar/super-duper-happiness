import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import "./App.css";
import Stefan from "./images/Stefan.jpg";
import Dani from "./images/Dani.jpg";
import Alex from "./images/Alex.jpg";
import Denisa from "./images/Denisa.jpg";
import LogInPanel from "./LoginPanel/LogInPanel.js";
import ChatBox from "./ChatBox/ChatBox.js";
import ChatList from "./ChatList/ChatList.js";

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
