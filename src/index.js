import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./state/createStore";
import { createStoreService } from "./services/store/createStoreService";
import "./firebase/startFirebaseService";
import { createAppModule } from "./modules/App/AppModule";

const store = createStore();
const storeService = createStoreService(store);

ReactDOM.render(
  <Provider store={store}>{createAppModule(storeService).render()}</Provider>,
  document.getElementById("root")
);
registerServiceWorker();
