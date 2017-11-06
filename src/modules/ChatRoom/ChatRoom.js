import React from "react";
import { connect } from "react-redux";

import ChatRoomView from "./ChatRoomView";

export function createChatRoomModule(messagesWatcher, messagesService) {
  function stateMapper(state) {
    const { selectedChatRoom, chatRooms, messages, currentUser } = state;

    const selectedChatRoomData =
      selectedChatRoom === null ? null : chatRooms[selectedChatRoom];

    return {
      chatRoomData: selectedChatRoomData,
      messages,
      currentUser: currentUser
    };
  }

  function dispatchMapper(dispatch) {
    return {};
  }

  const { stopWatchingForMessages, watchForMessagesInRoom } = messagesWatcher;
  const { sendMessage } = messagesService;

  return {
    render() {
      const View = connect(stateMapper, dispatchMapper)(ChatRoomView);
      return (
        <View
          stopWatchingForMessages={stopWatchingForMessages}
          watchForMessagesInRoom={watchForMessagesInRoom}
          sendMessage={sendMessage}
        />
      );
    }
  };
}
