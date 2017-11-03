import React, { Component } from "react";

import "./ChatRoomMessageList.css";
import ChatRoomMessageListItem from "./ChatRoomMessageListItem/ChatRoomMessageListItem";

export default class ChatRoomMessageList extends Component {
  render() {
    return <div className="chat-room-message-list__root">{this.content()}</div>;
  }

  content() {
    if (this.props.messages === null) {
      return (
        <div className="chat-room-message-list__cta">
          <h1>Select a room to start chatting!</h1>
        </div>
      );
    } else {
      return this.props.messages.map((message, index) => {
        const messageAlignment = this.isMessageFromCurrentUser(message)
          ? "right"
          : "left";

        return (
          <div
            className={`chat-room-message-list__item-container___${messageAlignment}`}
          >
            <ChatRoomMessageListItem key={index} message={message} />
          </div>
        );
      });
    }
  }

  isMessageFromCurrentUser(message) {
    return message.sender === this.props.currentUser;
  }
}
