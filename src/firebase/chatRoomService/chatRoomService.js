import firebase from "firebase";
import "firebase/firestore";

export default function createChatRoomService() {
  const firestore = firebase.firestore();

  return {
    createChatRoom(name) {
      return firestore.collection("chatRooms").add({
        name
      });
    },

    observeRoomList(callback) {
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

        callback(chatRoomsObject);
      });
    }
  };
}
