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
    },

    observeChatRooms() {
      chatRoomService.observeRoomList(({ added, modified, removed }) => {
        if (added) {
          Object.keys(added).forEach(addedRoomId => {
            const addedRoom = added[addedRoomId];

            storeService.addChatRoom(addedRoomId, addedRoom);
          });
        }

        if (modified) {
          Object.keys(modified).forEach(modifiedRoomId => {
            const modifiedRoom = modified[modifiedRoomId];

            storeService.addChatRoom(modifiedRoomId, modifiedRoom);
          });
        }

        if (removed) {
          Object.keys(removed).forEach(removedRoomId => {
            storeService.removeChatRoom(removedRoomId);
          });
        }
      });
    },

    stopObservingChatRooms: chatRoomService.stopObservingChatRooms
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
