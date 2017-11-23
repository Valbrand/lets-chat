import { moduleAssembler } from "../../assemblers/moduleAssembler";
import ChatRoomView from "../../views/ChatRoomView/ChatRoomView";

function createChatRoomViewModel(state) {
  const { selectedChatRoom, chatRooms, messages, currentUser } = state;

  const selectedChatRoomData =
    selectedChatRoom === null ? null : chatRooms[selectedChatRoom];

  return {
    chatRoomData: selectedChatRoomData,
    messages,
    currentUser: currentUser
  };
}

function createChatRoomController(messagesService, storeService) {
  return {
    watchForMessagesInRoom(roomId) {
      messagesService.observeChatRoomMessages(roomId, messages => {
        storeService.addMessages(messages);
      });
    },
    sendMessage: messagesService.sendMessage,
    stopWatchingForMessages: messagesService.stopObservingChatRoomMessages
  };
}

export function createChatRoomModule(messagesService, storeService) {
  const chatRoomController = createChatRoomController(
    messagesService,
    storeService
  );

  return moduleAssembler(
    createChatRoomViewModel,
    chatRoomController,
    ChatRoomView
  );
}
