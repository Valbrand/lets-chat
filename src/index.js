import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "./firebase/startFirebaseService";
import { AppContainer } from "./containers/App/AppContainer";

ReactDOM.render(<AppContainer />, document.getElementById("root"));
registerServiceWorker();
