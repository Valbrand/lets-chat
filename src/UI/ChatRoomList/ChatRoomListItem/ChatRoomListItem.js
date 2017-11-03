import React, { Component } from "react";

import "./ChatRoomListItem.css";

export default class ChatRoomListItem extends Component {
  render() {
    const { chatRoom } = this.props;

    return (
      <div className="chat-room-list-item__root">
        <h2 className="chat-room-list-item__name">{chatRoom.name}</h2>
        <p className="chat-room-list-item__last-message-sender">
          {chatRoom.lastMessage.sender}
        </p>
        <p className="chat-room-list-item__last-message-content">
          {chatRoom.lastMessage.content}
        </p>
      </div>
    );
  }
}