import React, { Component } from "react";
import { Observer } from "mobx-react";
import firebase from "firebase";
import "firebase/firestore";

import noop from "../../utils/noop";
import randomName from "../../utils/randomName/randomName";
import { ChatRoomListView } from "../../views/ChatRoomListView/ChatRoomListView";

export class ChatRoomListContainer extends Component {
  _actionMapper = actionMapper();

  render() {
    const { store } = this.props;

    return (
      <Observer>
        {() => {
          const mappedState = stateMapper(store);
          const mappedActions = this._actionMapper(store);

          return <ChatRoomListView {...mappedState} {...mappedActions} />;
        }}
      </Observer>
    );
  }
}

function stateMapper(state) {
  debugger;

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

  return function(store) {
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
            store.selectChatRoom(roomId);
          });
      },

      selectChatRoom(roomId) {
        store.selectChatRoom(roomId);
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

                store.addChatRoom(addedRoomId, addedRoom);
              });
            }

            if (modified) {
              Object.keys(modified).forEach(modifiedRoomId => {
                const modifiedRoom = modified[modifiedRoomId];

                store.addChatRoom(modifiedRoomId, modifiedRoom);
              });
            }

            if (removed) {
              Object.keys(removed).forEach(removedRoomId => {
                store.removeChatRoom(removedRoomId);
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
