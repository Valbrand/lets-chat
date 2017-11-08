import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./modules/App";
import registerServiceWorker from "./registerServiceWorker";
import LetsChatStore from "./state/LetsChatStore";
import "./firebase/startFirebaseService";
import createChatRoomService from "./firebase/chatRoomService/chatRoomService";
import createMessagesService from "./firebase/messagesService/messagesService";
import { createChatRoomListWatcher } from "./firebase/stateIntegration/chatRoomListWatcher";
import { createAuthStateWatcher } from "./firebase/stateIntegration/authStateWatcher";

const store = new LetsChatStore();

const authStateWatcher = createAuthStateWatcher(store);
authStateWatcher.start();

const chatRoomService = createChatRoomService();
const chatRoomListWatcher = createChatRoomListWatcher(chatRoomService, store);
chatRoomListWatcher.watchChatRooms();

const messagesService = createMessagesService();

ReactDOM.render(
  <App
    chatRoomService={chatRoomService}
    messagesService={messagesService}
    store={store}
  />,
  document.getElementById("root")
);
registerServiceWorker();
