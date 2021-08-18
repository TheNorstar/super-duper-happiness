import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import "./App.css";
import Stefan from "./images/Stefan.jpg";
import Dani from "./images/Dani.jpg";
import Alex from "./images/Alex.jpg";
import Denisa from "./images/Denisa.jpg";
import David from "./images/David.jpg";
import Dragos from "./images/Dragos.jpg";
import Andreea from "./images/Andreea.jpg";
import Maria from "./images/Maria.jpg";
import Robert from "./images/Robert.jpg";
import Paul from "./images/Paul.jpg";
import Radu from "./images/Radu.jpg";
import LogInPanel from "./LoginPanel/LogInPanel.js";
import ChatBox from "./ChatBox/ChatBox.js";
import ChatList from "./ChatList/ChatList.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn : false, 
            user : "",
            contacts : ["Stefan", "Alex", "Dani", "Denisa", "Maria", "Radu", "Andreea", "Paul", "David", "Robert"],
            filteredContacts : ["Stefan", "Alex", "Dani", "Denisa", "Maria", "Dragos", "Radu", "Andreea", "Paul", "David", "Robert"],
            profilePictures : {
                "Stefan" : Stefan, 
                "Alex" : Alex,
                "Dani" : Dani, 
                "Denisa" : Denisa,
                "Maria" : Maria,
                "Dragos" : Dragos,
                "Radu" : Radu,
                "Andreea" : Andreea,
                "Paul" : Paul,
                "David" : David,
                "Robert" : Robert
            },
            chatHistory : {
                "Stefan" : [["Stefan", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum lacinia est, eu pharetra enim. Sed pellentesque tempus nibh, in iaculis tortor suscipit at. Donec interdum ligula vitae dolor egestas hendrerit. Vivamus porta fringilla lacus. Etiam ac neque vel massa posuere tempor. Nunc at mauris vel nulla bibendum tristique non."
                , new Date()], ["Lucian", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus justo non diam feugiat, vel bibendum odio feugiat. Curabitur ultrices urna in gravida convallis. Etiam.", new Date()]],
                "Alex" : [],
                "Dani" : [], 
                "Denisa" : [],
                "Maria" : [],
                "Dragos" : [],
                "Radu" : [],
                "Andreea" : [],
                "Paul" : [],
                "David" : [],
                "Robert" : []
            },
            activeChat : "Denisa"
        }
        this.handleLogIn = this.handleLogIn.bind(this);
        this.changeChat = this.changeChat.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.filterContacts = this.filterContacts.bind(this);
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
        let message = document.getElementById("messageInput").value;
        if(message.trim().length > 0) {
            updatedChatHistory[this.state.activeChat].push([this.state.user, message, new Date()]);
            document.getElementById("messageInput").value = "";
            this.setState({chatHistory : updatedChatHistory});
        }
    }

    filterContacts(e) {
        e.preventDefault();
        let filterText = document.getElementsByClassName("searchChat")[0].value.toLowerCase();
        let newFilteredContacts = [];
        console.log(filterText.value);

        for(let contact of this.state.contacts) {
            if(contact.toLowerCase().includes(filterText))
                newFilteredContacts.push(contact);
        }
        this.setState({filteredContacts : newFilteredContacts});
    }

    render () {
        return (
            <div className = "App">
                <div className = "siteContent">
                    {this.state.LoggedIn &&
                        <div className = "ChatWrapper">
                            <ChatList 
                                    contacts = {this.state.filteredContacts} 
                                    profilePictures = {this.state.profilePictures}  
                                    changeChat = {this.changeChat}
                                    filterContacts = {this.filterContacts}
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
                        <LogInPanel LoggedIn={this.state.LoggedIn} 
                                    handleLogIn={this.handleLogIn} />
                    }
                </div>
                </div>
        )
    }
}

export default App;
