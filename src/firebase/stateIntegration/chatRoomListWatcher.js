export function createChatRoomListWatcher(chatRoomService, storeService) {
  return {
    watchChatRooms() {
      chatRoomService.observeRoomList(({ added, modified, removed }) => {
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
    }
  };
}
