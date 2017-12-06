import { createChatRoomListController } from "./ChatRoomListController";
import { createChatRoomListViewModel } from "./ChatRoomListViewModel";
import { moduleAssembler } from "../../assemblers/moduleAssembler";
import { ChatRoomListView } from "../../views/ChatRoomListView/ChatRoomListView";

export function createChatRoomListModule(storeService) {
  const chatRoomListController = createChatRoomListController(storeService);

  return moduleAssembler(
    createChatRoomListViewModel,
    chatRoomListController,
    ChatRoomListView
  );
}
