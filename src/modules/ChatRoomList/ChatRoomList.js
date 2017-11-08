import React from "react";
import { Observer } from "mobx-react";

import ChatRoomListView from "./ChatRoomListView";
import randomName from "../../utils/randomName/randomName";

export function createChatRoomListModule(chatRoomService, store) {
  function stateMapper(state) {
    const chatRooms = Object.keys(state.chatRooms)
      .map(roomId => state.chatRooms[roomId])
      .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));

    return {
      chatRooms,
      currentUser: state.currentUser,
      selectedChatRoom: state.selectedChatRoom
    };
  }

  function actionMapper(store) {
    return {
      createChatRoom() {
        chatRoomService.createChatRoom(randomName()).then(roomId => {
          store.selectChatRoom(roomId);
        });
      },

      selectChatRoom(roomId) {
        store.selectChatRoom(roomId);
      }
    };
  }

  return {
    render() {
      return (
        <Observer>
          {() => {
            const mappedState = stateMapper(store);
            const mappedActions = actionMapper(store);

            return <ChatRoomListView {...mappedState} {...mappedActions} />;
          }}
        </Observer>
      );
    }
  };
}
