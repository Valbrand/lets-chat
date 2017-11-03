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
              isAnyRoomSelected={chatRoomData != null}
            />
          </div>
        </div>

        <div className="chat-room__message-input-container">
          <ChatRoomMessageInput
            chatRoomData={chatRoomData}
            currentUser={currentUser}
          />
        </div>
      </div>
    );
  }

  componentDidUpdate(previousProps) {
    const currentChatRoomData = this.props.chatRoomData;
    const previousChatRoomData = previousProps.chatRoomData;

    if (currentChatRoomData !== previousChatRoomData) {
      const { messagesWatcher } = this.props;

      messagesWatcher.stopWatchingForMessages();

      if (currentChatRoomData != null) {
        messagesWatcher.watchForMessagesInRoom(currentChatRoomData.id);
      }
    }
  }
}

function mapState(state) {
  const { selectedChatRoom, chatRooms, messages, currentUser } = state;

  const selectedChatRoomData =
    selectedChatRoom === null ? null : chatRooms[selectedChatRoom];

  return {
    chatRoomData: selectedChatRoomData,
    messages,
    currentUser: currentUser
  };
}

export default connect(mapState, {})(ChatRoom);
