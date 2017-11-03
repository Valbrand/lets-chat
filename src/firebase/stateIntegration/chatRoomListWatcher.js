import createChatRoomService from "../chatRoomService/chatRoomService";
import { addChatRoom, removeChatRoom } from "../../state/chatRooms/chatRooms";

export function createChatRoomListWatcher(store) {
  const chatRoomService = createChatRoomService();

  return {
    watchChatRooms() {
      chatRoomService.observeRoomList(({ added, modified, removed }) => {
        if (added) {
          Object.keys(added).forEach(addedRoomId => {
            const addedRoom = added[addedRoomId];

            store.dispatch(addChatRoom(addedRoomId, addedRoom));
          });
        }

        if (modified) {
          Object.keys(modified).forEach(modifiedRoomId => {
            const modifiedRoom = modified[modifiedRoomId];

            store.dispatch(addChatRoom(modifiedRoomId, modifiedRoom));
          });
        }

        if (removed) {
          Object.keys(removed).forEach(removedRoomId => {
            store.dispatch(removeChatRoom(removedRoomId));
          });
        }
      });
    }
  };
}
