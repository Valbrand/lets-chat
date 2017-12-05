import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

import noop from "../../utils/noop";
import { addMessages } from "../../state/messages/messages";
import { ChatRoomView } from "../../views/ChatRoomView/ChatRoomView";

class ChatRoom extends Component {
  render() {
    return <ChatRoomView {...this.props} />;
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

  return function(dispatch) {
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

            dispatch(addMessages(newMessages));
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

export const ChatRoomContainer = connect(stateMapper, actionMapper)(ChatRoom);
