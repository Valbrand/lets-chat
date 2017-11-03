import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./UI/App";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./state/createStore";
import "./firebase/startFirebaseService";
import { createStateIntegrationManager } from "./firebase/stateIntegration/reduxStateIntegration";

const store = createStore();

const stateIntegrationManager = createStateIntegrationManager(store);
stateIntegrationManager.watchChatRooms();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
