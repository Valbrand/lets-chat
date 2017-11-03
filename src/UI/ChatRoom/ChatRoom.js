import React, { Component } from "react";
import { connect } from "react-redux";

import "./ChatRoom.css";
import ChatRoomHeader from "./ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageList from "./ChatRoomMessageList/ChatRoomMessageList";
import ChatRoomMessageInput from "./ChatRoomMessageInput/ChatRoomMessageInput";

class ChatRoom extends Component {
  render() {
    const { chatRoomData, messages, currentUser } = this.props;

    return (
      <div className="chat-room__root">
        <div className="chat-room__header-container">
          <ChatRoomHeader chatRoomData={chatRoomData} />
        </div>

        <div className="chat-room__message-list-container">
          <div className="chat-room__message-list-inner-container">
            <ChatRoomMessageList
              messages={messages}
              currentUser={currentUser}
            />
          </div>
        </div>

        <div className="chat-room__message-input-container">
          <ChatRoomMessageInput />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { selectedChatRoom, chatRooms, messages, currentUser } = state;

  const selectedChatRoomData =
    selectedChatRoom === null ? null : chatRooms[selectedChatRoom];
  const selectedChatRoomMessages =
    selectedChatRoom === null ? null : messages[selectedChatRoom];

  return {
    chatRoomData: selectedChatRoomData,
    messages: selectedChatRoomMessages,
    currentUser: currentUser
  };
}

export default connect(mapState, {})(ChatRoom);
