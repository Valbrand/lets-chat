import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import { createAppModule } from "./modules/App/App";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./state/createStore";
import "./firebase/startFirebaseService";
import createChatRoomService from "./firebase/chatRoomService/chatRoomService";
import createMessagesService from "./firebase/messagesService/messagesService";
import { createStoreService } from "./services/createStoreService";
import { createChatRoomListWatcher } from "./firebase/stateIntegration/chatRoomListWatcher";
import { createAuthStateWatcher } from "./firebase/stateIntegration/authStateWatcher";

const store = createStore();
const storeService = createStoreService(store);

const authStateWatcher = createAuthStateWatcher(storeService);
authStateWatcher.start();

const chatRoomService = createChatRoomService();
const chatRoomListWatcher = createChatRoomListWatcher(
  chatRoomService,
  storeService
);
chatRoomListWatcher.watchChatRooms();

const messagesService = createMessagesService();

ReactDOM.render(
  <Provider store={store}>
    {createAppModule(chatRoomService, messagesService, storeService).render()}
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
