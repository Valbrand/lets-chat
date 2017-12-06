import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { createAuthService } from "../../services/auth/createAuthService";
import { createStoreService } from "../../services/store/createStoreService";
import { changeUser } from "../../state/currentUser/currentUser";
import { AppView } from "../../views/AppView/AppView";

class App extends Component {
  render() {
    return <AppView {...this.props} />;
  }
}

function stateMapper(state) {
  const { currentUser } = state;

  return {
    shouldShowChatInterface: currentUser != null
  };
}

function actionMapper() {
  const authService = createAuthService();

  return function(dispatch, ownProps) {
    const { storeService } = ownProps;

    return {
      observeAuthState() {
        authService.authenticate().then(userId => {
          authService.observeAuthState(userId, user => {
            storeService.changeUser(user);
          });
        });
      },

      stopObservingAuthState: authService.stopObservingAuthState
    };
  };
}

export const AppContainer = connect(stateMapper, actionMapper)(App);
