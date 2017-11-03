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
        const changesObject = querySnapshot.docChanges.reduce(
          (result, change) => {
            if (result[change.type] === undefined) {
              result[change.type] = {};
            }

            result[change.type][change.doc.id] = change.doc.data();

            return result;
          },
          {}
        );

        callback(changesObject);
      });
    }
  };
}
