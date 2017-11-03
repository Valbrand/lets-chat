import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import randomName from "../../utils/randomName/randomName";

export default function createAuthService(store) {
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  return {
    authenticate() {
      return auth
        .signInAnonymously()
        .then(result => {
          const userObject = {
            id: result.uid,
            name: randomName()
          };

          const userReference = firestore.doc(`/users/${userObject.id}`);

          userReference.get().then(snapshot => {
            if (!snapshot.exists) {
              userReference.set(userObject);
            }
          });

          return userObject.id;
        })
        .catch(error => {
          alert(
            "An error was detected while trying to authenticate you with the servers"
          );
          console.log(error);
        });
    },

    observeAuthState(userId, callback) {
      firestore.doc(`/users/${userId}`).onSnapshot(snapshot => {
        callback(snapshot.data());
      });
    }
  };
}
