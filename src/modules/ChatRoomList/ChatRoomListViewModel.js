export function createChatRoomListViewModel(state) {
  const chatRooms = Object.keys(state.chatRooms)
    .map(roomId => state.chatRooms[roomId])
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));

  return {
    chatRooms,
    currentUser: state.currentUser,
    selectedChatRoom: state.selectedChatRoom
  };
}
