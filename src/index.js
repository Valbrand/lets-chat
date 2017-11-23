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
import { createAuthService } from "./services/createAuthService";
import { createStoreService } from "./services/createStoreService";
import { createChatRoomListWatcher } from "./firebase/stateIntegration/chatRoomListWatcher";

const store = createStore();
const storeService = createStoreService(store);

const authService = createAuthService();

const chatRoomService = createChatRoomService();
const chatRoomListWatcher = createChatRoomListWatcher(
  chatRoomService,
  storeService
);
chatRoomListWatcher.watchChatRooms();

const messagesService = createMessagesService();

ReactDOM.render(
  <Provider store={store}>
    {createAppModule(
      authService,
      chatRoomService,
      messagesService,
      storeService
    ).render()}
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
