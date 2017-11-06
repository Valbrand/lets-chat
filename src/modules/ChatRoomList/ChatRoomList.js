import React from "react";
import { connect } from "react-redux";

import ChatRoomListView from "./ChatRoomListView";
import { selectChatRoom } from "../../state/selectedChatRoom/selectedChatRoom";

export function createChatRoomListModule(chatRoomService) {
  function stateMapper(state) {
    return {
      chatRooms: state.chatRooms,
      currentUser: state.currentUser,
      selectedChatRoom: state.selectedChatRoom
    };
  }

  function dispatchMapper(dispatch) {
    return {
      createChatRoom(roomName) {
        chatRoomService.createChatRoom(roomName).then(roomId => {
          dispatch(selectChatRoom(roomId));
        });
      },

      selectChatRoom(roomId) {
        dispatch(selectChatRoom(roomId));
      }
    };
  }

  return {
    initialize() {
      const View = connect(stateMapper, dispatchMapper)(ChatRoomListView);
      return <View />;
    }
  };
}
