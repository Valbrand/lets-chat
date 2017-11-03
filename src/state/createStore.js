import { createStore, combineReducers } from "redux";

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

export default function storeFactory() {
  return createStore(rootReducer);
}
