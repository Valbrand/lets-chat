import { bindActionCreators } from "redux";

import { actionCreators as chatRoomActions } from "./chatRooms/chatRooms";
import { actionCreators as currentUserActions } from "./currentUser/currentUser";
import { actionCreators as messageActions } from "./messages/messages";
import { actionCreators as selectedChatRoomActions } from "./selectedChatRoom/selectedChatRoom";

export function createReduxStoreService(store) {
  return {
    ...bindActionCreators(chatRoomActions, store.dispatch),
    ...bindActionCreators(currentUserActions, store.dispatch),
    ...bindActionCreators(messageActions, store.dispatch),
    ...bindActionCreators(selectedChatRoomActions, store.dispatch)
  };
}
