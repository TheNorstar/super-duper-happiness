import React, {useEffect, useState} from "react";
import "./ChatBox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEllipsisV, faTrash} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
moment().format();

const SendBox = props => {
    return (
        <form className = "messageForm" onSubmit = {props.handleNewMessage} autocomplete = "off">
            <div className = "sendBox">
                <input id = "messageInput" type="text" name="name" />
                <button  className = "sendButton">
                    <FontAwesomeIcon icon = {faAngleRight}/>
                </button>
            </div>
        </form>
    )
    
}

const Message = props => {

    function handleDelete() {
        props.deleteMessage(props.id);
    }

    return (
        <div className = {props.selfMessage? "selfMessageBox": "otherMessageBox"}>
            <div className = {props.selfMessage? "selfMessage": "otherMessage"}>
                <h5 className = "MessageMetaData">{props.user} said at {props.date}</h5>
                <div className = "Message">
                    <p>{props.message}</p> 
                    {props.selfMessage && <FontAwesomeIcon icon = {faTrash} onClick = {handleDelete}/>}
                </div>
                
            </div>
        </div>
    )
}

const ChatLog = props => {

    function formatDate(el){
        const dateString = moment(el.date).format("HH:mm");
        return dateString;
    }

    return (
        <div className = "ChatLogWrapper">
            <div className = "ChatLog">
                {props.messages.map((el, index) => (
                    <Message 
                        key = {el._id}
                        id = {el._id}
                        user = {el.from}
                        date = {formatDate(el)}
                        message = {el.text}
                        selfMessage = {el.from == props.user}
                        deleteMessage = {props.deleteMessage}/>
                ))}
            </div>
        </div>
    )
}

const ChatBox = props => {
    useEffect(() => {
        let chatHistory = document.getElementsByClassName("ChatLogWrapper")[0];
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, [])
    return (
        <div className = "ChatBox">
            <div className = "userBanner"> 
                <img src={props.profilePicture} className = "profilePic"/>
                <h1>{props.activeChat}</h1>
                <FontAwesomeIcon icon = {faEllipsisV} className = "optionsIcon"/>
            </div>
            <ChatLog messages = {props.messages} user = {props.user} deleteMessage = {props.deleteMessage}/>
            <SendBox handleNewMessage = {props.handleNewMessage}/>

        </div>
    )
}

export default ChatBox;
