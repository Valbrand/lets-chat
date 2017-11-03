import React, { Component } from "react";

import "./ChatRoom.css";
import ChatRoomHeader from "./ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageList from "./ChatRoomMessageList/ChatRoomMessageList";
import ChatRoomMessageInput from "./ChatRoomMessageInput/ChatRoomMessageInput";

export default class ChatRoom extends Component {
  render() {
    const { chatRoomData, messages, currentUser } = this.props;

    return (
      <div className="chat-room__root">
        <div className="chat-room__header-container">
          <ChatRoomHeader chatRoomData={chatRoomData} />
        </div>

        <div className="chat-room__message-list-container">
          <ChatRoomMessageList messages={messages} currentUser={currentUser} />
        </div>

        <div className="chat-room__message-input-container">
          <ChatRoomMessageInput />
        </div>
      </div>
    );
  }
}
