import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { storeInstance } from "./state/LetsChatStore";
import { createStoreService } from "./services/store/createStoreService";
import "./firebase/startFirebaseService";
import { createAppModule } from "./modules/App/AppModule";

const store = storeInstance();
const storeService = createStoreService(store);

ReactDOM.render(
  createAppModule(storeService).render(),
  document.getElementById("root")
);
registerServiceWorker();
