import { createMessagesService } from "../../services/messages/createMessagesService";

export function createChatRoomController(storeService) {
  const messagesService = createMessagesService();

  return {
    watchForMessagesInRoom(roomId) {
      messagesService.observeMessagesInRoom(roomId, newMessages => {
        storeService.addMessages(newMessages);
      });
    },

    sendMessage: messagesService.sendMessage,
    stopWatchingForMessages: messagesService.stopObservingMessages
  };
}
