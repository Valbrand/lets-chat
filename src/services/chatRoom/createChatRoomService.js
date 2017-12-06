import { createFirebaseChatRoomService } from "../../firebase/chatRoomService/firebaseChatRoomService";

export function createChatRoomService() {
  const chatRoomService = createFirebaseChatRoomService();

  return {
    createChatRoom: chatRoomService.createChatRoom,
    observeChatRoomList: chatRoomService.observeChatRoomList,
    stopObservingChatRoomList: chatRoomService.stopObservingChatRoomList
  };
}
