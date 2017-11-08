import React from "react";
import { Observer } from "mobx-react";

import ChatRoomView from "./ChatRoomView";

export function createChatRoomModule(messagesService, store) {
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

  function actionsMapper(store) {
    return {
      watchForMessagesInRoom(roomId) {
        messagesService.observeChatRoomMessages(roomId, messages => {
          store.addMessages(messages);
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
      return (
        <Observer>
          {() => {
            const mappedState = stateMapper(store);
            const mappedActions = actionsMapper(store);

            return (
              <ChatRoomView
                {...mappedState}
                {...mappedActions}
                stopWatchingForMessages={stopWatchingForMessages}
                sendMessage={sendMessage}
              />
            );
          }}
        </Observer>
      );
    }
  };
}
