import { createStore, combineReducers, applyMiddleware } from "redux";

import chatRooms from "./chatRooms/chatRooms";
import currentUser from "./currentUser/currentUser";
import messages from "./messages/messages";
import selectedChatRoom, {
  chatRoomSelectionMiddleware
} from "./selectedChatRoom/selectedChatRoom";

const rootReducer = combineReducers({
  chatRooms,
  currentUser,
  messages,
  selectedChatRoom
});

const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

export default function storeFactory() {
  const middleware = applyMiddleware(chatRoomSelectionMiddleware, logger);
  return createStore(rootReducer, middleware);
}
