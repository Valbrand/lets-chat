import { createStore, combineReducers, applyMiddleware } from "redux";

import chatRooms from "./chatRooms/chatRooms";
import currentUser from "./currentUser/currentUser";
import messages from "./messages/messages";
import selectedChatRoom from "./selectedChatRoom/selectedChatRoom";

const rootReducer = combineReducers({
  chatRooms,
  currentUser,
  messages,
  selectedChatRoom
});

function logger({ getState }) {
  return next => action => {
    console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action);

    console.log("state after dispatch", getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

export default function storeFactory() {
  return createStore(rootReducer, applyMiddleware(logger));
}
