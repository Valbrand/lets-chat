import React, { Component } from "react";
import { Observer } from "mobx-react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import noop from "../../utils/noop";
import randomName from "../../utils/randomName/randomName";
import { AppView } from "../../views/AppView/AppView";

export class AppContainer extends Component {
  _actionMapper = actionMapper();

  render() {
    const { store } = this.props;

    return (
      <Observer>
        {() => {
          const mappedState = stateMapper(store);
          const mappedActions = this._actionMapper(store);

          return <AppView {...mappedState} {...mappedActions} store={store} />;
        }}
      </Observer>
    );
  }
}

function stateMapper(state) {
  const { currentUser } = state;

  return {
    shouldShowChatInterface: currentUser != null
  };
}

function actionMapper() {
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  let removeObserver = noop;

  function authenticate() {
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
  }

  return function(store) {
    return {
      observeAuthState() {
        authenticate().then(userId => {
          removeObserver();

          removeObserver = firestore
            .doc(`/users/${userId}`)
            .onSnapshot(snapshot => {
              if (snapshot.exists) {
                const user = snapshot.data();

                store.changeUser(user);
              }
            });
        });
      },

      stopObservingAuthState() {
        removeObserver();

        removeObserver = noop;
      }
    };
  };
}
