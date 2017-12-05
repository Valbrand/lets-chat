import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

import noop from "../../utils/noop";
import randomName from "../../utils/randomName/randomName";
import { selectChatRoom } from "../../state/selectedChatRoom/selectedChatRoom";
import { addChatRoom, removeChatRoom } from "../../state/chatRooms/chatRooms";
import { ChatRoomListView } from "../../views/ChatRoomListView/ChatRoomListView";

class ChatRoomList extends Component {
  render() {
    return <ChatRoomListView {...this.props} />;
  }
}

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

function actionMapper() {
  const firestore = firebase.firestore();
  let removeObserver = noop;

  return function(dispatch) {
    return {
      createChatRoom() {
        const chatRoomName = randomName();

        firestore
          .collection("chatRooms")
          .add({
            name: chatRoomName
          })
          .then(document => document.id)
          .then(roomId => {
            dispatch(selectChatRoom(roomId));
          });
      },

      selectChatRoom(roomId) {
        dispatch(selectChatRoom(roomId));
      },

      observeChatRooms() {
        removeObserver();

        removeObserver = firestore
          .collection("chatRooms")
          .onSnapshot(querySnapshot => {
            const changesObject = querySnapshot.docChanges.reduce(
              (result, change) => {
                if (result[change.type] === undefined) {
                  result[change.type] = {};
                }

                result[change.type][change.doc.id] = {
                  ...change.doc.data(),
                  id: change.doc.id
                };

                return result;
              },
              {}
            );

            const { added, modified, removed } = changesObject;

            if (added) {
              Object.keys(added).forEach(addedRoomId => {
                const addedRoom = added[addedRoomId];

                dispatch(addChatRoom(addedRoomId, addedRoom));
              });
            }

            if (modified) {
              Object.keys(modified).forEach(modifiedRoomId => {
                const modifiedRoom = modified[modifiedRoomId];

                dispatch(addChatRoom(modifiedRoomId, modifiedRoom));
              });
            }

            if (removed) {
              Object.keys(removed).forEach(removedRoomId => {
                dispatch(removeChatRoom(removedRoomId));
              });
            }
          });
      },

      stopObservingChatRooms() {
        removeObserver();
        removeObserver = noop;
      }
    };
  };
}

export const ChatRoomListContainer = connect(stateMapper, actionMapper)(
  ChatRoomList
);
