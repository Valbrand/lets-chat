import React from "react";
import { connect } from "react-redux";

import ChatRoomView from "./ChatRoomView";
import { addMessages } from "../../state/messages/messages";

export function createChatRoomModule(messagesService) {
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
    return {
      watchForMessagesInRoom(roomId) {
        messagesService.observeChatRoomMessages(roomId, messages => {
          dispatch(addMessages(messages));
        });
      }
    };
  }

  const {
    sendMessage,
    stopObservingChatRoomMessages: stopWatchingForMessages
  } = messagesService;

  return {
    render() {
      const View = connect(stateMapper, dispatchMapper)(ChatRoomView);
      return (
        <View
          stopWatchingForMessages={stopWatchingForMessages}
          sendMessage={sendMessage}
        />
      );
    }
  };
}
