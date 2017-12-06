import { changeUser } from "./currentUser/currentUser";
import { addMessages } from "./messages/messages";
import { selectChatRoom } from "./selectedChatRoom/selectedChatRoom";
import { addChatRoom, removeChatRoom } from "./chatRooms/chatRooms";

export function createReduxStoreService(store) {
  return {
    changeUser(user) {
      store.dispatch(changeUser(user));
    },

    addMessages(messages) {
      store.dispatch(addMessages(messages));
    },

    selectChatRoom(roomId) {
      store.dispatch(selectChatRoom(roomId));
    },

    addChatRoom(id, roomData) {
      store.dispatch(addChatRoom(id, roomData));
    },

    removeChatRoom(ids) {
      store.dispatch(removeChatRoom(ids));
    }
  };
}
