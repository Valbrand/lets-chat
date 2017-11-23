import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import { createAppModule } from "./modules/App/App";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./state/createStore";
import "./firebase/startFirebaseService";
import { createMessagesService } from "./services/createMessagesService";
import { createAuthService } from "./services/createAuthService";
import { createChatRoomService } from "./services/createChatRoomService";
import { createStoreService } from "./services/createStoreService";

const store = createStore();

const storeService = createStoreService(store);
const authService = createAuthService();
const chatRoomService = createChatRoomService();
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
