import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import LetsChatStore from "./state/LetsChatStore";
import "./firebase/startFirebaseService";
import { AppContainer } from "./containers/App/AppContainer";

const store = new LetsChatStore();

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById("root")
);
registerServiceWorker();
