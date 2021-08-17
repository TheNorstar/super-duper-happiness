import React from "react";
import "./ChatBox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEllipsisV} from '@fortawesome/free-solid-svg-icons';

class SendBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <form className = "submitButton" onSubmit = {this.props.handleNewMessage} autocomplete = "off">
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
        console.log(el[2]);
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
                    <FontAwesomeIcon icon = {faEllipsisV} className = "optionsIcon" />
                </div>
                <ChatLog chatHistory = {this.props.chatHistory} user = {this.props.user}/>
                <SendBox handleNewMessage = {this.props.handleNewMessage}/>
            </div>
        )
    }
}

export default ChatBox;
