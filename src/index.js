import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./modules/App";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./state/createStore";
import "./firebase/startFirebaseService";
import createChatRoomService from "./firebase/chatRoomService/chatRoomService";
import createMessagesService from "./firebase/messagesService/messagesService";
import { createChatRoomListWatcher } from "./firebase/stateIntegration/chatRoomListWatcher";
import { createMessagesWatcher } from "./firebase/stateIntegration/messagesWatcher";
import { createAuthStateWatcher } from "./firebase/stateIntegration/authStateWatcher";

const store = createStore();

const authStateWatcher = createAuthStateWatcher(store);
authStateWatcher.start();

const chatRoomService = createChatRoomService();
const chatRoomListWatcher = createChatRoomListWatcher(chatRoomService, store);
chatRoomListWatcher.watchChatRooms();

const messagesService = createMessagesService();
const messagesWatcher = createMessagesWatcher(messagesService, store);

ReactDOM.render(
  <Provider store={store}>
    <App
      messagesWatcher={messagesWatcher}
      chatRoomService={chatRoomService}
      messagesService={messagesService}
    />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
