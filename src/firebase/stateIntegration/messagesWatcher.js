import createMessagesService from "../messagesService/messagesService";
import { addMessages } from "../../state/messages/messages";

export function createMessagesWatcher(messagesService, store) {
  return {
    watchForMessagesInRoom(roomId) {
      messagesService.observeChatRoomMessages(roomId, messages => {
        store.dispatch(addMessages(messages));
      });
    },

    stopWatchingForMessages() {
      messagesService.stopObservingChatRoomMessages();
    }
  };
}
