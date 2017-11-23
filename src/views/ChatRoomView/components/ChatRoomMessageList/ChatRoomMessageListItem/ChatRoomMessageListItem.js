import React, { Component } from "react";

import "./ChatRoomMessageListItem.css";

export default class ChatRoomMessageListItem extends Component {
  render() {
    const { message } = this.props;

    return (
      <div className="chat-room-message-list-item__root">
        <div className="chat-room-message-list-item__balloon">
          <p className="chat-room-message-list-item__sender">
            {message.sender.name}
          </p>
          <p className="chat-room-message-list-item__content">
            {message.content}
          </p>
        </div>
        <p className="chat-room-message-list-item__timestamp">
          {message.timestamp && message.timestamp.valueOf()}
        </p>
      </div>
    );
  }
}
