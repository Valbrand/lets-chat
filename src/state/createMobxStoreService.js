export function createMobxStoreService(store) {
  return {
    changeUser(user) {
      store.changeUser(user);
    },

    addMessages(messages) {
      store.addMessages(messages);
    },

    selectChatRoom(roomId) {
      store.selectChatRoom(roomId);
    },

    addChatRoom(id, roomData) {
      store.addChatRoom(id, roomData);
    },

    removeChatRoom(ids) {
      store.removeChatRoom(ids);
    }
  };
}
