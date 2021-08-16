import React from "react";
import "./ChatList.css";

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

export default ChatList;