import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import ChatList from './ChatList/ChatList';
import ChatBox from './ChatBox/ChatBox';
import LogInPanel from "./LoginPanel/LogInPanel";
import "./App.css";

const App = props => {
    const [socket, setSocket] = useState(null);
    const [LoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [profilePictures, setProfilePictures] = useState({});
    const [messages, setMessages] = useState([]);
    const [activeChat, setActiveChat] = useState("");
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if(user != "") {
            getMessages()
            getUsers()
        }
    }, [user])

    useEffect(() => {

    }, [messages])

    useEffect(() => {
        if(contacts.includes(user)) {
            const newContacts = contacts.filter((el) => el != user)
            setContacts(newContacts);
            setFilteredContacts(newContacts);
            setActiveChat(newContacts[0]);
        }
    }, [contacts])

    useEffect(() => {
        if(activeChat != "")
            getMessages();
    }, [activeChat])
    useEffect(() => {
        if(firstRender) {
            setFirstRender(false);
            const socket = require("socket.io-client").io("http://localhost:3002", {
                path : "/socket/"
            });
            setSocket(socket);
            socket.on("login-yes", () => handleLogIn());
            socket.on("messages", (messages) => setMessages(messages));
            socket.on("users", (users) => { 
                const profilePictures = {};
                for(const user of users) {
                    profilePictures[user] = 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg';
                }
                setContacts(users); 
                setProfilePictures(profilePictures);
                });
        }
    }, [firstRender])

    function handleLogIn () {
        setUser(document.querySelector(".logInForm .usernameInput").value);
        setLoggedIn(true);
    }

    function changeChat (contact) {
        setActiveChat(contact);
    }

    function handleNewMessage(e) {
        e.preventDefault();
        insertMessage();
        document.getElementById("messageInput").value = '';
    }

    function insertMessage() {
        const data = {};
        data.from = user;
        data.to = activeChat;
        data.date = new Date().toISOString();
        data.text = document.getElementById("messageInput").value;
        socket.emit("message", data);
    }

    function deleteMessage(id) {
        const data = {};
        data.from = user;
        data.to = activeChat 
        setMessages(messages.filter((el) => el._id != id));
        socket.emit("delete-message", id, data);
    }

    function filterContacts() {
        if(document.getElementsByClassName("searchChat")[0] == null)
            return contacts;
        let filterText = document.getElementsByClassName("searchChat")[0].value.toLowerCase();
        let newFilteredContacts = [];

        for(let contact of contacts) {
            if(contact.toLowerCase().includes(filterText))
                newFilteredContacts.push(contact);
        }
        setFilteredContacts(newFilteredContacts);
    }

    function getMessages() {
        socket.emit("get-messages", user, activeChat);
    }

    function getUsers() {
        socket.emit("get-users");
    }

    function checkLogIn() {
        const data = {}
        data.username = document.querySelector('.logInForm .usernameInput').value;
        data.password = document.querySelector('.logInForm .passwordInput').value;
        socket.emit("login", data);
    }

    function handleSignUp(e) {
        e.preventDefault();
        const data = {}
        data.user = document.querySelector('.signUpForm .usernameInput').value;
        data.password = document.querySelector('.signUpForm .passwordInput').value;
        socket.emit("sign-up", data);
    }

    return (
        <div className = "App">
            <div className = "siteContent">
                {LoggedIn &&
                    <div className = "ChatWrapper">
                        <ChatList 
                                filterContacts = {filterContacts}
                                contacts = {filteredContacts}
                                profilePictures = {profilePictures}  
                                changeChat = {changeChat}
                            />
                        <ChatBox 
                                user = {user}
                                activeChat = {activeChat} 
                                profilePicture = {profilePictures[activeChat]} 
                                messages = {messages}
                                handleNewMessage = {handleNewMessage}
                                deleteMessage = {deleteMessage}
                        />
                    </div>
                }
                {!LoggedIn &&
                    <LogInPanel LoggedIn={LoggedIn} 
                                handleLogIn={(checkLogIn)}
                                handleSignUp={(handleSignUp)}/>
                }
            </div>
            </div>
    )
}

export default App;
