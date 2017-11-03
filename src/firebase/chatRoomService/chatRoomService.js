import firebase from "firebase";
import "firebase/firestore";
import Promise from "bluebird";

export default function createChatRoomService() {
  const firestore = firebase.firestore();

  return {
    createChatRoom(name) {
      return firestore.collection("chatRooms").add({
        name
      });
    },

    observeRoomList() {
      return new Promise((resolve, reject) => {
        firestore.collection("chatRooms").onSnapshot(querySnapshot => {
          const chatRoomsObject = querySnapshot.docs.reduce(
            (result, document) => {
              const documentId = document.id;
              const documentData = document.data();

              result[documentId] = documentData;

              return result;
            },
            {}
          );

          resolve(chatRoomsObject);
        });
      });
    }
  };
}
