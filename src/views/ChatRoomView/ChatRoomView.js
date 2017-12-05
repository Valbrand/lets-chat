import React, { Component } from "react";

import "./ChatRoomView.css";
import ChatRoomHeader from "./components/ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageList from "./components/ChatRoomMessageList/ChatRoomMessageList";
import ChatRoomMessageInput from "./components/ChatRoomMessageInput/ChatRoomMessageInput";

export class ChatRoomView extends Component {
  render() {
    const { chatRoomData, messages, currentUser, sendMessage } = this.props;

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
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );
  }

  componentDidUpdate(previousProps) {
    this.adjustMessageListenersIfNeeded(previousProps);
  }

  adjustMessageListenersIfNeeded(previousProps) {
    const currentChatRoomData = this.props.chatRoomData;
    const previousChatRoomData = previousProps.chatRoomData;

    const hasUserEnteredARoom =
      previousChatRoomData == null && currentChatRoomData != null;
    const hasUserLeftARoom = currentChatRoomData == null;
    const hasUserChangedRooms =
      previousChatRoomData != null &&
      currentChatRoomData != null &&
      previousChatRoomData.id !== currentChatRoomData.id;

    if (hasUserLeftARoom || hasUserEnteredARoom || hasUserChangedRooms) {
      const { stopWatchingForMessages, watchForMessagesInRoom } = this.props;

      stopWatchingForMessages();

      if (currentChatRoomData != null) {
        watchForMessagesInRoom(currentChatRoomData.id);
      }
    }
  }
}
