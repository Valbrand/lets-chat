import firebase from "firebase";
import "firebase/firestore";

import noop from "../../utils/noop";

export function createFirebaseChatRoomService() {
  const firestore = firebase.firestore();
  let removeObserver = noop;

  return {
    createChatRoom(name) {
      return firestore
        .collection("chatRooms")
        .add({
          name
        })
        .then(document => document.id);
    },

    observeChatRoomList(callback) {
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

          callback(changesObject);
        });
    },

    stopObservingChatRoomList() {
      removeObserver();
      removeObserver = noop;
    }
  };
}
