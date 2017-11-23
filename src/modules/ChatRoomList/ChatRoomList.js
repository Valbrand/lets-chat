import { moduleAssembler } from "../../assemblers/moduleAssembler";
import ChatRoomListView from "../../views/ChatRoomListView/ChatRoomListView";
import randomName from "../../utils/randomName/randomName";

function createChatRoomListViewModel(state) {
  const chatRooms = Object.keys(state.chatRooms)
    .map(roomId => state.chatRooms[roomId])
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));

  return {
    chatRooms,
    currentUser: state.currentUser,
    selectedChatRoom: state.selectedChatRoom
  };
}

function createChatRoomListController(chatRoomService, storeService) {
  return {
    createChatRoom() {
      chatRoomService.createChatRoom(randomName()).then(roomId => {
        storeService.selectChatRoom(roomId);
      });
    },

    selectChatRoom(roomId) {
      storeService.selectChatRoom(roomId);
    }
  };
}

export function createChatRoomListModule(chatRoomService, storeService) {
  const chatRoomListController = createChatRoomListController(
    chatRoomService,
    storeService
  );

  return moduleAssembler(
    createChatRoomListViewModel,
    chatRoomListController,
    ChatRoomListView
  );
}
