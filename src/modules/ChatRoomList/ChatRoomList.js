import React from "react";
import { Observer } from "mobx-react";

import ChatRoomListView from "./ChatRoomListView";
import randomName from "../../utils/randomName/randomName";

export function createChatRoomListModule(chatRoomService, store) {
  function stateMapper(state) {
    return {
      chatRooms: state.chatRoomList,
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
