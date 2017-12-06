import { createMobxStoreService } from "../../state/createMobxStoreService";

export function createStoreService(store) {
  const reduxStoreService = createMobxStoreService(store);

  return {
    changeUser: reduxStoreService.changeUser,
    addMessages: reduxStoreService.addMessages,
    selectChatRoom: reduxStoreService.selectChatRoom,
    addChatRoom: reduxStoreService.addChatRoom,
    removeChatRoom: reduxStoreService.removeChatRoom
  };
}
