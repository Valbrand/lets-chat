export function createChatRoomListWatcher(chatRoomService, store) {
  return {
    watchChatRooms() {
      chatRoomService.observeRoomList(({ added, modified, removed }) => {
        if (added) {
          Object.keys(added).forEach(addedRoomId => {
            const addedRoom = added[addedRoomId];

            store.addChatRoom(addedRoomId, addedRoom);
          });
        }

        if (modified) {
          Object.keys(modified).forEach(modifiedRoomId => {
            const modifiedRoom = modified[modifiedRoomId];

            store.addChatRoom(modifiedRoomId, modifiedRoom);
          });
        }

        if (removed) {
          Object.keys(removed).forEach(removedRoomId => {
            store.removeChatRoom(removedRoomId);
          });
        }
      });
    }
  };
}
