import React, { PureComponent } from "react";

import "./ChatRoomListItem.css";

export default class ChatRoomListItem extends PureComponent {
  render() {
    const { chatRoom, onSelect } = this.props;

    return (
      <div className="chat-room-list-item__root" onClick={onSelect}>
        <h2 className="chat-room-list-item__name">{chatRoom.name}</h2>
        {chatRoom.lastMessage ? (
          <div className="chat-room-list-item__last-message-container">
            <p className="chat-room-list-item__last-message-sender">
              {chatRoom.lastMessage.sender.name}
            </p>
            <p className="chat-room-list-item__last-message-content">
              {chatRoom.lastMessage.content}
            </p>
          </div>
        ) : (
          <div className="chat-room-list-item__last-message-container">
            <p className="chat-room-list-item__no-messages-warning">
              No messages here yet.
            </p>
          </div>
        )}
      </div>
    );
  }
}
