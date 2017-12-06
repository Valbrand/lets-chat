import { createChatRoomController } from "./ChatRoomController";
import { createChatRoomViewModel } from "./ChatRoomViewModel";
import { moduleAssembler } from "../../assemblers/moduleAssembler";
import { ChatRoomView } from "../../views/ChatRoomView/ChatRoomView";

export function createChatRoomModule(storeService) {
  const chatRoomController = createChatRoomController(storeService);

  return moduleAssembler(
    createChatRoomViewModel,
    chatRoomController,
    ChatRoomView
  );
}
