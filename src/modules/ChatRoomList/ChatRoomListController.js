import randomName from "../../utils/randomName/randomName";
import { createChatRoomService } from "../../services/chatRoom/createChatRoomService";

export function createChatRoomListController(storeService) {
  const chatRoomService = createChatRoomService();

  return {
    createChatRoom() {
      const chatRoomName = randomName();

      chatRoomService.createChatRoom(chatRoomName).then(roomId => {
        storeService.selectChatRoom(roomId);
      });
    },

    selectChatRoom(roomId) {
      storeService.selectChatRoom(roomId);
    },

    observeChatRooms() {
      chatRoomService.observeChatRoomList(({ added, modified, removed }) => {
        if (added) {
          Object.keys(added).forEach(addedRoomId => {
            const addedRoom = added[addedRoomId];

            storeService.addChatRoom(addedRoomId, addedRoom);
          });
        }

        if (modified) {
          Object.keys(modified).forEach(modifiedRoomId => {
            const modifiedRoom = modified[modifiedRoomId];

            storeService.addChatRoom(modifiedRoomId, modifiedRoom);
          });
        }

        if (removed) {
          Object.keys(removed).forEach(removedRoomId => {
            storeService.removeChatRoom(removedRoomId);
          });
        }
      });
    },

    stopObservingChatRooms: chatRoomService.stopObservingChatRoomList
  };
}
