import React from "react";
import { connect } from "react-redux";

import ChatRoomListView from "./ChatRoomListView";
import { selectChatRoom } from "../../state/selectedChatRoom/selectedChatRoom";
import randomName from "../../utils/randomName/randomName";

export function createChatRoomListModule(chatRoomService) {
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

  function dispatchMapper(dispatch) {
    return {
      createChatRoom() {
        chatRoomService.createChatRoom(randomName()).then(roomId => {
          dispatch(selectChatRoom(roomId));
        });
      },

      selectChatRoom(roomId) {
        dispatch(selectChatRoom(roomId));
      }
    };
  }

  return {
    render() {
      const View = connect(stateMapper, dispatchMapper)(ChatRoomListView);
      return <View />;
    }
  };
}
