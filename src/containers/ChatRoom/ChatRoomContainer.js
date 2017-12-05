import React, { Component } from "react";
import { Observer } from "mobx-react";
import firebase from "firebase";
import "firebase/firestore";

import noop from "../../utils/noop";
import { ChatRoomView } from "../../views/ChatRoomView/ChatRoomView";

export class ChatRoomContainer extends Component {
  _actionMapper = actionMapper();

  render() {
    const { store } = this.props;

    return (
      <Observer>
        {() => {
          const mappedState = stateMapper(store);
          const mappedActions = this._actionMapper(store);

          return <ChatRoomView {...mappedState} {...mappedActions} />;
        }}
      </Observer>
    );
  }
}

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

function actionMapper() {
  const firestore = firebase.firestore();
  let removeObserver = noop;

  return function(store) {
    return {
      watchForMessagesInRoom(roomId) {
        const messageCollectionPath = `/chatRooms/${roomId}/messages`;

        removeObserver();
        removeObserver = firestore
          .collection(messageCollectionPath)
          .orderBy("timestamp")
          .onSnapshot(querySnapshot => {
            const newMessages = querySnapshot.docChanges
              .filter(docChange => docChange.type === "added")
              .map(addedMessage => addedMessage.doc.data());

            store.addMessages(newMessages);
          });
      },

      sendMessage(roomId, user, body) {
        const messageObject = {
          sender: {
            id: user.id,
            name: user.name
          },
          content: body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        const chatRoomPath = `/chatRooms/${roomId}`;
        const messageReference = firestore
          .collection(`${chatRoomPath}/messages`)
          .doc();
        const chatRoomReference = firestore.doc(`${chatRoomPath}`);

        const batchWrite = firestore.batch();

        batchWrite.set(messageReference, messageObject);

        batchWrite.update(chatRoomReference, {
          lastMessage: messageObject
        });

        return batchWrite.commit();
      },

      stopWatchingForMessages() {
        removeObserver();
        removeObserver = noop;
      }
    };
  };
}
