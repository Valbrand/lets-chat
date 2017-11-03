import React, { Component } from "react";

import "./ChatRoomMessageList.css";
import ChatRoomMessageListItem from "./ChatRoomMessageListItem/ChatRoomMessageListItem";

export default class ChatRoomMessageList extends Component {
  render() {
    return (
      <div
        className="chat-room-message-list__root"
        ref={root => {
          this.root = root;
        }}
      >
        <div className="chat-room-message-list__messages-container">
          {this.content()}
        </div>
      </div>
    );
  }

  content() {
    let { messages } = this.props;

    if (messages === null) {
      return (
        <div className="chat-room-message-list__cta">
          <h1>Select a room to start chatting!</h1>
        </div>
      );
    } else {
      return messages.map((message, index) => {
        const messageAlignment = this.isMessageFromCurrentUser(message)
          ? "right"
          : "left";

        return (
          <div
            key={index}
            className={`chat-room-message-list__item-container___${messageAlignment}`}
          >
            <ChatRoomMessageListItem message={message} />
          </div>
        );
      });
    }
  }

  isMessageFromCurrentUser(message) {
    return message.sender === this.props.currentUser;
  }

  componentDidMount() {
    this.root.scrollTop = this.root.scrollHeight;
  }
}
