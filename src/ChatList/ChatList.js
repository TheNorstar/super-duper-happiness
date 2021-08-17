import React from "react";
import "./ChatList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        let target = e.target;
        if(target.className == "chatItem")
            this.props.changeChat(target.children[1].innerHTML.trim());
        else if(target.parentElement.className == "chatItem") {
            this.props.changeChat(target.parentElement.children[1].innerHTML.trim());
        }
    }
    render () {
        return (
            <div className = "ChatList">
                <label className = "searchWrapper">
                    <FontAwesomeIcon icon={faSearch} className = "searchIcon" />
                    <input className = "searchChat" onChange = {this.props.filterContacts}/>
                </label>
                <div className = "horizontalRuler">
                </div>
                <div className = "ChatItemsWrapper" >
                    <div className = "ChatItems">
                    {this.props.contacts.map( el => (
                        <div className = "chatItemWrapper" key = {el}>
                            <div className = "chatItem" onClick = {this.handleClick} >
                                <img src = {this.props.profilePictures[el]} className = "profilePic"/>
                                <h2 className = "userName"> {el} </h2>
                            </div>
                            <div className = "horizontalRuler">
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatList;