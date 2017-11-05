import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./UI/App";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./state/createStore";
import "./firebase/startFirebaseService";
import { createChatRoomListWatcher } from "./firebase/stateIntegration/chatRoomListWatcher";
import { createMessagesWatcher } from "./firebase/stateIntegration/messagesWatcher";
import { createAuthStateWatcher } from "./firebase/stateIntegration/authStateWatcher";

const store = createStore();

const authStateWatcher = createAuthStateWatcher(store);
authStateWatcher.start();

const stateIntegrationManager = createChatRoomListWatcher(store);
stateIntegrationManager.watchChatRooms();

const messagesWatcher = createMessagesWatcher(store);

ReactDOM.render(
  <Provider store={store}>
    <App messagesWatcher={messagesWatcher} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
