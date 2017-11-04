import firebase from "firebase";
import "firebase/firestore";

export default function createMessagesService() {
  const firestore = firebase.firestore();
  let unsubscribeLastListener = () => {};

  return {
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

    observeChatRoomMessages(roomId, callback) {
      const messageCollectionPath = `/chatRooms/${roomId}/messages`;

      unsubscribeLastListener();
      unsubscribeLastListener = firestore
        .collection(messageCollectionPath)
        .orderBy("timestamp")
        .onSnapshot(querySnapshot => {
          const newMessages = querySnapshot.docChanges
            .filter(docChange => docChange.type === "added")
            .map(addedMessage => addedMessage.doc.data());

          callback(newMessages);
        });
    },

    stopObservingChatRoomMessages() {
      unsubscribeLastListener();
      unsubscribeLastListener = () => {};
    }
  };
}
