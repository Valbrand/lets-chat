import React, { Component } from "react";

import "./ChatRoomMessageInput.css";

export default class ChatRoomMessageInput extends Component {
  render() {
    return (
      <div className="chat-room-message-input__root">
        <input className="chat-room-message-input__text-field" type="text" />
      </div>
    );
  }
}
