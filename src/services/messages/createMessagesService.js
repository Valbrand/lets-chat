import { createFirebaseMessagesService } from "../../firebase/messagesService/firebaseMessagesService";

export function createMessagesService() {
  const messagesService = createFirebaseMessagesService();

  return {
    sendMessage: messagesService.sendMessage,
    observeMessagesInRoom: messagesService.observeMessagesInRoom,
    stopObservingMessages: messagesService.stopObservingMessages
  };
}
